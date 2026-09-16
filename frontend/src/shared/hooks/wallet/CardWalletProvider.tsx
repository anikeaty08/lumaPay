import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useWallet } from '@/shared/hooks/wallet/WalletProvider';
import {
    closeCardVaultOnChain,
    createCardVaultOnChain,
    setCardDailyLimitOnChain
} from '@/midnight/card-vault';
import {
    deleteCardWallet as deleteCardWalletEntry,
    getCardWallet,
    submitCardLimitChange,
    upsertCardWallet
} from '../../services/api';
import { CardTokenCode } from '../../types/tokens';
import { CardWalletProfile } from '../../types/user';
import { decryptCardPrivateKey, encryptCardPrivateKey } from '../../utils/card/cardCrypto';
import { CardKdfAlgorithm } from '../../types/card';
import { decryptWithPassword, encryptWithPassword, hashAddress } from '../../utils/core/crypto';
import { CARD_PIN_LENGTH, CARD_SECRET_MIN_LENGTH } from '../../utils/card/cardInputLimits';
import { CARD_HINT_MAX_BYTES, CARD_LABEL_MAX_BYTES, getUtf8ByteLength } from '../../utils/core/compactInputLimits';
import { sha256HexToField } from '../../utils/card/cardChain';
import { useWalletErrorHandler } from './WalletErrorBoundary';
import { useBurnerWallet } from './BurnerWalletProvider';
import { NIGHT_ATOMIC_SCALE, isNativeMidnightAddress, submitNightTransfer, toNightAtomic } from '@/midnight/native-transfer';

type BalanceKey = 'NIGHT';

interface CardLimitDraft {
    max_balance: number;
}

interface CreateCardOptions {
    label: string;
    hint?: string;
}

interface CardWalletContextValue {
    card: CardWalletProfile | null;
    isLoading: boolean;
    isUnlocked: boolean;
    decryptedCardKey: string | null;
    cardBalances: Record<BalanceKey, number> | null;
    isRefreshingBalances: boolean;
    createCard: (pin: string, cardSecret: string, options: CreateCardOptions) => Promise<CardWalletProfile>;
    unlockCard: (pin: string, cardSecret: string, options?: { persist?: boolean }) => Promise<string>;
    lockCard: () => void;
    refreshCard: () => Promise<void>;
    refreshCardBalances: (
        pin?: string,
        cardSecret?: string,
        options?: { retryOnZero?: boolean }
    ) => Promise<Record<BalanceKey, number> | null>;
    topUpCard: (token: CardTokenCode, amount: number, pin?: string, cardSecret?: string) => Promise<string>;
    requestCardLimitChange: (token: CardTokenCode, nextLimits: CardLimitDraft) => Promise<CardWalletProfile>;
    sweepCardFundsToMain: (pin?: string, cardSecret?: string) => Promise<string[]>;
    deleteCard: () => Promise<void>;
}

const CardWalletContext = createContext<CardWalletContextValue | undefined>(undefined);

const AUTO_LOCK_MS = 10 * 60 * 1000;
const DEFAULT_LIMIT_MICROS = 25_000_000;
const TOKEN_TO_BALANCE_KEY: Record<CardTokenCode, BalanceKey> = {
    NIGHT: 'NIGHT'
};

const DEFAULT_CARD_LIMITS: Record<CardTokenCode, CardLimitDraft> = {
    NIGHT: { max_balance: DEFAULT_LIMIT_MICROS }
};

function validatePin(pin: string) {
    if (!new RegExp(`^\\d{${CARD_PIN_LENGTH}}$`).test(pin)) {
        throw new Error(`Card PIN must be exactly ${CARD_PIN_LENGTH} digits.`);
    }
}

function validateCardSecret(cardSecret: string) {
    const normalized = cardSecret?.trim() || '';
    if (normalized.length < CARD_SECRET_MIN_LENGTH) {
        throw new Error(`Card secret must be at least ${CARD_SECRET_MIN_LENGTH} characters long.`);
    }
}

function validateCardLabel(label: string) {
    const normalized = label?.trim() || '';
    if (!normalized) {
        throw new Error('Card label is required.');
    }
    if (getUtf8ByteLength(normalized) > CARD_LABEL_MAX_BYTES) {
        throw new Error(`Card label must be ${CARD_LABEL_MAX_BYTES} bytes or fewer.`);
    }
}

function normalizeCardHint(cardHint?: string) {
    const normalized = cardHint?.trim() || '';
    if (!normalized) {
        return null;
    }
    if (getUtf8ByteLength(normalized) > CARD_HINT_MAX_BYTES) {
        throw new Error(`Card hint must be ${CARD_HINT_MAX_BYTES} bytes or fewer.`);
    }
    return normalized;
}

function normalizeCardNumber(cardNumber: string) {
    return cardNumber.replace(/\D/g, '');
}

function calculateLuhnCheckDigit(partialNumber: string) {
    let sum = 0;
    let shouldDouble = true;
    for (let index = partialNumber.length - 1; index >= 0; index -= 1) {
        let digit = Number(partialNumber[index]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return String((10 - (sum % 10)) % 10);
}

function generateVisaStyleCardNumber() {
    const randomDigits = Array.from(window.crypto.getRandomValues(new Uint8Array(14)))
        .map((digit) => String(digit % 10))
        .join('');
    const partial = `4${randomDigits}`;
    return `${partial}${calculateLuhnCheckDigit(partial)}`;
}

function toBase64(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
}

function randomHex32(): string {
    const bytes = window.crypto.getRandomValues(new Uint8Array(32));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function assertNightOnly(token: CardTokenCode, action: string) {
    if (token !== 'NIGHT') {
        throw new Error(`${action} is NIGHT-only on Preprod.`);
    }
}

function resetKeyMaterial(value: string | null) {
    if (!value) return;
    void value;
}

function buildLimitChangeMessage(card: CardWalletProfile, token: CardTokenCode, nextLimits: CardLimitDraft) {
    return JSON.stringify({
        action: 'lumapay_card_limit_change_v1',
        card_address: card.card_address,
        card_number_hash: card.card_number_hash || null,
        token,
        previous_limits: {
            max_balance: card.limits[token].max_balance
        },
        next_limits: nextLimits,
        nonce: window.crypto.randomUUID(),
        timestamp: new Date().toISOString()
    });
}

function buildCardDeletionMessage(card: CardWalletProfile) {
    return JSON.stringify({
        action: 'lumapay_card_delete_v1',
        card_address: card.card_address,
        card_number_hash: card.card_number_hash || null,
        nonce: window.crypto.randomUUID(),
        timestamp: new Date().toISOString()
    });
}

function normalizeMaybeEncryptedValue(
    value: string | null | undefined,
    appPassword: string | null,
    isPlaintext: (next: string) => boolean
) {
    if (!value) {
        return Promise.resolve('');
    }
    if (isPlaintext(value)) {
        return Promise.resolve(value);
    }
    if (!appPassword) {
        return Promise.resolve('');
    }
    return decryptWithPassword(value, appPassword).catch(() => '');
}

export const CardWalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { api, address, wallet } = useWallet();
    const { handleWalletError } = useWalletErrorHandler();
    const { appPassword } = useBurnerWallet();
    const [card, setCard] = useState<CardWalletProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [decryptedCardKey, setDecryptedCardKey] = useState<string | null>(null);
    const [cardBalances, setCardBalances] = useState<Record<BalanceKey, number> | null>(null);
    const [isRefreshingBalances, setIsRefreshingBalances] = useState(false);
    const autoLockTimeoutRef = useRef<number | null>(null);

    const clearAutoLockTimeout = () => {
        if (autoLockTimeoutRef.current !== null) {
            window.clearTimeout(autoLockTimeoutRef.current);
            autoLockTimeoutRef.current = null;
        }
    };

    const lockCard = () => {
        clearAutoLockTimeout();
        resetKeyMaterial(decryptedCardKey);
        setDecryptedCardKey(null);
    };

    const scheduleAutoLock = () => {
        clearAutoLockTimeout();
        autoLockTimeoutRef.current = window.setTimeout(() => {
            lockCard();
        }, AUTO_LOCK_MS);
    };

    const clearCachedCard = (ownerAddress: string) => {
        try {
            window.localStorage.removeItem(`lumapay_card_wallet_cache_v1:${ownerAddress.toLowerCase()}`);
        } catch (error) {
            console.warn('[CardWalletProvider] Failed to clear legacy local card cache', error);
        }
    };

    const normalizeDbCardProfile = async (profile: CardWalletProfile | null): Promise<CardWalletProfile | null> => {
        if (!profile) {
            return null;
        }

        const normalizedAddress = await normalizeMaybeEncryptedValue(
            profile.encrypted_card_address || profile.card_address,
            appPassword,
            (value) => value.startsWith('midnight1')
        );
        const normalizedCardNumber = await normalizeMaybeEncryptedValue(
            profile.encrypted_card_number || profile.card_number,
            appPassword,
            (value) => /^\d{16}$/.test(value)
        );

        return {
            ...profile,
            card_address: normalizedAddress || profile.card_address,
            encrypted_card_address: profile.encrypted_card_address || profile.card_address || null,
            card_number: normalizedCardNumber || profile.card_number || null,
            encrypted_card_number: profile.encrypted_card_number || null,
            card_number_hash_field: profile.card_number_hash
                ? sha256HexToField(profile.card_number_hash)
                : profile.card_number_hash_field || null,
            limits: profile.limits || DEFAULT_CARD_LIMITS
        };
    };

    const fetchMirrorCard = async () => {
        if (!address) {
            return null;
        }

        try {
            const dbCard = await getCardWallet(address);
            return normalizeDbCardProfile(dbCard);
        } catch (error) {
            console.warn('[CardWalletProvider] DB mirror lookup failed', error);
            return null;
        }
    };

    const setCardState = (nextCard: CardWalletProfile | null) => {
        setCard(nextCard);
        if (!nextCard) {
            setCardBalances(null);
            lockCard();
        }
    };

    const refreshCard = async () => {
        if (!address) {
            setCardState(null);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const dbCard = await fetchMirrorCard();
            if (dbCard) {
                let resolvedCard = dbCard;

                if (!resolvedCard.mainOwner) {
                    try {
                        const repairedCard = await upsertCardWallet(address, {
                            main_address: address
                        });
                        const normalizedRepairedCard = await normalizeDbCardProfile(repairedCard);
                        if (normalizedRepairedCard) {
                            resolvedCard = normalizedRepairedCard;
                        }
                    } catch (error) {
                        console.warn('[CardWalletProvider] Failed to repair missing card main owner mirror', error);
                    }
                }

                setCardState(resolvedCard);
                return;
            }

            clearCachedCard(address);
            setCardState(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshCard();
    }, [address, appPassword]);

    useEffect(() => {
        const handlePageHide = () => lockCard();
        window.addEventListener('pagehide', handlePageHide);
        window.addEventListener('beforeunload', handlePageHide);
        return () => {
            window.removeEventListener('pagehide', handlePageHide);
            window.removeEventListener('beforeunload', handlePageHide);
            clearAutoLockTimeout();
        };
    }, [decryptedCardKey]);

    const unlockCard = async (pin: string, cardSecret: string, options?: { persist?: boolean }) => {
        if (!card) {
            throw new Error('No LumaPay card is configured yet.');
        }

        validatePin(pin);
        validateCardSecret(cardSecret);

        const kdfAlgorithm: CardKdfAlgorithm = card.card_kdf_algorithm === 'argon2id'
            ? 'argon2id'
            : 'pbkdf2-sha256';
        const kdfParams = {
            opslimit: Number((card.card_kdf_params as any)?.opslimit),
            memlimit: Number((card.card_kdf_params as any)?.memlimit),
            alg: Number((card.card_kdf_params as any)?.alg),
            iterations: Number((card.card_kdf_params as any)?.iterations),
            hash: (card.card_kdf_params as any)?.hash === 'SHA-256' ? 'SHA-256' : undefined,
            version: Number((card.card_kdf_params as any)?.version || 1)
        };

        const nextKey = await decryptCardPrivateKey(
            card.encrypted_card_private_key,
            pin,
            cardSecret,
            card.card_kdf_salt,
            kdfAlgorithm,
            kdfParams as any
        );

        if (options?.persist !== false) {
            setDecryptedCardKey(nextKey);
            scheduleAutoLock();
        }

        return nextKey;
    };

    const refreshCardBalances = async (
        pin?: string,
        cardSecret?: string,
        _options?: { retryOnZero?: boolean }
    ) => {
        if (!card) {
            setCardBalances(null);
            return null;
        }

        const shouldUseTempUnlock = !decryptedCardKey && pin && cardSecret;
        const activeKey = decryptedCardKey || (shouldUseTempUnlock ? await unlockCard(pin!, cardSecret!, { persist: false }) : null);
        if (!activeKey) {
            console.warn('[CardWalletProvider] Skipping card balance refresh because no decrypted card key is available.');
            return cardBalances;
        }

        try {
            setIsRefreshingBalances(true);
            const balances = cardBalances ?? { NIGHT: 0 };
            setCardBalances(balances);
            if (decryptedCardKey) scheduleAutoLock();
            return balances;
        } finally {
            setIsRefreshingBalances(false);
            if (shouldUseTempUnlock) {
                resetKeyMaterial(activeKey);
            }
        }
    };

    const persistMirrorCard = async (
        ownerAddress: string,
        payload: {
            mainAddress: string;
            encryptedCardAddress: string;
            encryptedCardNumber: string;
            cardNumberHashHex: string;
            cardLast4: string;
            encryptedPrivateKey: string;
            cardKdfSalt: string;
            cardKdfAlgorithm: string;
            cardKdfParams: Record<string, unknown>;
            cardLabel: string;
            cardHint: string | null;
            cardId?: string | null;
            metadataDigest?: string | null;
            ownerSecretCiphertext?: string | null;
            ownerPrivateIdentityCiphertext?: string | null;
            vaultNonceCiphertext?: string | null;
            vaultRandomnessCiphertext?: string | null;
            vaultCommitment?: string | null;
            creationTxId?: string | null;
            closeTxId?: string | null;
        }
    ) => {
        try {
            await upsertCardWallet(ownerAddress, {
                main_address: payload.mainAddress,
                card_id: payload.cardId,
                card_address: payload.encryptedCardAddress,
                encrypted_card_number: payload.encryptedCardNumber,
                card_number_hash: payload.cardNumberHashHex,
                card_metadata_digest: payload.metadataDigest,
                card_owner_secret_ciphertext: payload.ownerSecretCiphertext,
                card_owner_private_identity_ciphertext: payload.ownerPrivateIdentityCiphertext,
                card_vault_nonce_ciphertext: payload.vaultNonceCiphertext,
                card_vault_randomness_ciphertext: payload.vaultRandomnessCiphertext,
                card_vault_commitment: payload.vaultCommitment,
                card_creation_tx_id: payload.creationTxId,
                card_close_tx_id: payload.closeTxId,
                card_last4: payload.cardLast4,
                encrypted_card_private_key: payload.encryptedPrivateKey,
                card_kdf_salt: payload.cardKdfSalt,
                card_kdf_algorithm: payload.cardKdfAlgorithm,
                card_kdf_params: payload.cardKdfParams,
                card_label: payload.cardLabel,
                card_hint: payload.cardHint,
                limits: DEFAULT_CARD_LIMITS
            });
        } catch (error) {
            console.warn('[CardWalletProvider] Failed to persist card mirror after chain success', error);
        }
    };

    const createCard = async (pin: string, cardSecret: string, options: CreateCardOptions) => {
        if (!api || !address) {
            throw new Error('Connect your main Midnight wallet first.');
        }
        if (!appPassword) {
            throw new Error('Unlock the app with your password before creating a card.');
        }

        validatePin(pin);
        validateCardSecret(cardSecret);
        validateCardLabel(options.label);
        const cardHint = normalizeCardHint(options.hint);

        const cardAuthorizationSecret = randomHex32();
        const cardNumber = generateVisaStyleCardNumber();
        const cardLast4 = normalizeCardNumber(cardNumber).slice(-4);
        const cardNumberHashHex = await hashAddress(cardNumber);
        const cardNumberHashField = sha256HexToField(cardNumberHashHex);
        const encrypted = await encryptCardPrivateKey(cardAuthorizationSecret, pin, cardSecret);
        const pendingCardAddress = `mn_card_preprod_${randomHex32().slice(0, 32)}`;
        const encryptedCardAddress = await encryptWithPassword(pendingCardAddress, appPassword);
        const encryptedCardNumber = await encryptWithPassword(cardNumber, appPassword);
        const encryptedCardLabel = await encryptWithPassword(options.label.trim(), appPassword);
        const encryptedCardHint = cardHint ? await encryptWithPassword(cardHint, appPassword) : null;
        const metadataDigest = await hashAddress(JSON.stringify({
            encryptedCardAddress,
            encryptedCardNumber,
            encryptedCardLabel,
            encryptedCardHint,
            cardLast4,
            version: 1
        }));

        try {
            const opening = await createCardVaultOnChain(api, {
                cardNumberHash: cardNumberHashHex,
                metadataDigest,
                dailyLimit: BigInt(DEFAULT_CARD_LIMITS.NIGHT.max_balance)
            });

            if (!opening.transactionId) {
                throw new Error('The wallet did not return a transaction id for card creation.');
            }
            const cardAddress = `mn_card_preprod_${opening.cardId.slice(0, 32)}`;
            const storedEncryptedCardAddress = await encryptWithPassword(cardAddress, appPassword);
            const encryptedOwnerSecret = await encryptWithPassword(opening.ownerSecret, appPassword);
            const encryptedOwnerPrivateIdentity = await encryptWithPassword(opening.ownerPrivateIdentity, appPassword);
            const encryptedVaultNonce = await encryptWithPassword(opening.vaultNonce, appPassword);
            const encryptedVaultRandomness = await encryptWithPassword(opening.vaultRandomness, appPassword);

            await persistMirrorCard(address, {
                mainAddress: address,
                encryptedCardAddress: storedEncryptedCardAddress,
                encryptedCardNumber,
                cardNumberHashHex,
                cardLast4,
                encryptedPrivateKey: encrypted.encryptedPrivateKey,
                cardKdfSalt: encrypted.saltBase64,
                cardKdfAlgorithm: encrypted.kdfAlgorithm,
                cardKdfParams: encrypted.kdfParams as unknown as Record<string, unknown>,
                cardLabel: options.label.trim(),
                cardHint,
                cardId: opening.cardId,
                metadataDigest,
                ownerSecretCiphertext: encryptedOwnerSecret,
                ownerPrivateIdentityCiphertext: encryptedOwnerPrivateIdentity,
                vaultNonceCiphertext: encryptedVaultNonce,
                vaultRandomnessCiphertext: encryptedVaultRandomness,
                vaultCommitment: opening.commitment,
                creationTxId: opening.transactionId
            });

            const finalizedCard = {
                address_hash: await hashAddress(address),
                main_owner: address,
                mainOwner: address,
                card_id: opening.cardId,
                card_address: cardAddress,
                encrypted_card_address: storedEncryptedCardAddress,
                card_number: cardNumber,
                encrypted_card_number: encryptedCardNumber,
                card_number_hash: cardNumberHashHex,
                card_number_hash_field: cardNumberHashField,
                card_metadata_digest: metadataDigest,
                card_owner_secret_ciphertext: encryptedOwnerSecret,
                card_owner_private_identity_ciphertext: encryptedOwnerPrivateIdentity,
                card_vault_nonce_ciphertext: encryptedVaultNonce,
                card_vault_randomness_ciphertext: encryptedVaultRandomness,
                card_vault_commitment: opening.commitment,
                card_creation_tx_id: opening.transactionId,
                card_last4: cardLast4,
                encrypted_card_private_key: encrypted.encryptedPrivateKey,
                card_kdf_salt: encrypted.saltBase64,
                card_kdf_algorithm: encrypted.kdfAlgorithm,
                card_kdf_params: encrypted.kdfParams as unknown as Record<string, unknown>,
                card_label: options.label.trim(),
                card_hint: cardHint,
                card_limits_updated_at: null,
                limits: DEFAULT_CARD_LIMITS
            };
            setCard(finalizedCard);
            setDecryptedCardKey(cardAuthorizationSecret);
            scheduleAutoLock();
            setCardBalances({ NIGHT: 0 });

            await persistMirrorCard(address, {
                mainAddress: address,
                encryptedCardAddress: storedEncryptedCardAddress,
                encryptedCardNumber,
                cardNumberHashHex,
                cardLast4,
                encryptedPrivateKey: encrypted.encryptedPrivateKey,
                cardKdfSalt: encrypted.saltBase64,
                cardKdfAlgorithm: encrypted.kdfAlgorithm,
                cardKdfParams: encrypted.kdfParams as unknown as Record<string, unknown>,
                cardLabel: options.label.trim(),
                cardHint,
                cardId: opening.cardId,
                metadataDigest,
                ownerSecretCiphertext: encryptedOwnerSecret,
                ownerPrivateIdentityCiphertext: encryptedOwnerPrivateIdentity,
                vaultNonceCiphertext: encryptedVaultNonce,
                vaultRandomnessCiphertext: encryptedVaultRandomness,
                vaultCommitment: opening.commitment,
                creationTxId: opening.transactionId
            });

            return finalizedCard;
        } catch (err: any) {
            if (handleWalletError(err)) {
                throw err;
            }
            throw err;
        }
    };

    const topUpCard = async (token: CardTokenCode, amount: number, pin?: string, cardSecret?: string) => {
        assertNightOnly(token, 'Card top-up');
        if (!address || !card?.card_address) {
            throw new Error('Connect your main wallet and create a card first.');
        }

        if (!api) {
            throw new Error('Connect your Midnight wallet before topping up the card.');
        }

        const amountAtomic = toNightAtomic(amount);
        const amountMicro = Number(amountAtomic);
        if (amountMicro <= 0) {
            throw new Error('Top-up amount must be greater than zero.');
        }

        const currentKnownBalanceMicro = cardBalances
            ? Math.round((cardBalances[TOKEN_TO_BALANCE_KEY[token]] || 0) * Number(NIGHT_ATOMIC_SCALE))
            : null;
        const maxBalance = card.limits[token].max_balance || 0;
        if (maxBalance > 0) {
            if (currentKnownBalanceMicro !== null && currentKnownBalanceMicro + amountMicro > maxBalance) {
                throw new Error(`This top-up would exceed your ${token} card balance cap.`);
            }
            if (currentKnownBalanceMicro === null && amountMicro > maxBalance) {
                throw new Error(`This top-up amount is larger than your ${token} card balance cap.`);
            }
        }

        const shouldUseTempUnlock = !decryptedCardKey && pin && cardSecret;
        const activeCardKey = decryptedCardKey || (shouldUseTempUnlock ? await unlockCard(pin!, cardSecret!, { persist: false }) : null);

        try {
            if (!activeCardKey) {
                throw new Error('Unlock the card before topping it up.');
            }
            if (!isNativeMidnightAddress(card.card_address)) {
                throw new Error('This card does not yet have a native Midnight shielded recipient address. Recreate it after card-vault deployment finishes, then retry top-up.');
            }
            const result = await submitNightTransfer(api, {
                kind: 'shielded',
                recipient: card.card_address,
                amountAtomic
            });
            setCardBalances({
                ...(cardBalances ?? { NIGHT: 0 }),
                NIGHT: (cardBalances?.NIGHT ?? 0) + amount
            });
            if (decryptedCardKey) scheduleAutoLock();
            return result.transactionId;
        } catch (err: any) {
            if (handleWalletError(err)) {
                throw err;
            }
            throw err;
        } finally {
            if (shouldUseTempUnlock && activeCardKey) {
                resetKeyMaterial(activeCardKey);
            }
        }
    };

    const requestCardLimitChange = async (token: CardTokenCode, nextLimits: CardLimitDraft) => {
        assertNightOnly(token, 'Card limit updates');
        if (!api || !address || !wallet?.adapter?.signMessage) {
            throw new Error('Main wallet signing is unavailable.');
        }
        if (!card) {
            throw new Error('Create your LumaPay card first.');
        }
        if (!appPassword || !card.card_id || !card.card_owner_secret_ciphertext) {
            throw new Error('Card vault opening metadata is missing. Recreate the card after the Midnight migration.');
        }

        let cardForLimitChange = card;

        if (appPassword) {
            const normalizedCardNumber = card.card_number ? normalizeCardNumber(card.card_number) : '';
            const encryptedCardAddress = card.encrypted_card_address
                || (card.card_address ? await encryptWithPassword(card.card_address, appPassword) : null);
            const encryptedCardNumber = card.encrypted_card_number
                || (normalizedCardNumber ? await encryptWithPassword(normalizedCardNumber, appPassword) : null);
            const cardNumberHash = card.card_number_hash
                || (normalizedCardNumber ? await hashAddress(normalizedCardNumber) : null);
            const cardLast4 = card.card_last4 || normalizedCardNumber.slice(-4) || null;

            if (encryptedCardAddress && encryptedCardNumber && cardNumberHash && cardLast4 && card.card_label) {
                await upsertCardWallet(address, {
                    main_address: address,
                    card_address: encryptedCardAddress,
                    encrypted_card_number: encryptedCardNumber,
                    card_number_hash: cardNumberHash,
                    card_last4: cardLast4,
                    encrypted_card_private_key: card.encrypted_card_private_key,
                    card_kdf_salt: card.card_kdf_salt,
                    card_kdf_algorithm: card.card_kdf_algorithm,
                    card_kdf_params: card.card_kdf_params,
                    card_label: card.card_label,
                    card_hint: card.card_hint || null,
                    limits: card.limits
                });

                cardForLimitChange = {
                    ...card,
                    card_number_hash: cardNumberHash,
                    card_last4: cardLast4,
                    encrypted_card_address: encryptedCardAddress,
                    encrypted_card_number: encryptedCardNumber
                };
            }
        }

        const sanitizedNextLimits: CardLimitDraft = {
            max_balance: Math.round(nextLimits.max_balance)
        };
        const ownerSecret = await decryptWithPassword(card.card_owner_secret_ciphertext, appPassword);
        const chainLimit = await setCardDailyLimitOnChain(
            api,
            card.card_id,
            ownerSecret,
            BigInt(sanitizedNextLimits.max_balance)
        );

        const message = buildLimitChangeMessage(cardForLimitChange, token, sanitizedNextLimits);
        const signatureResult = await wallet.adapter.signMessage(new TextEncoder().encode(message));
        const signatureBytes = signatureResult instanceof Uint8Array
            ? signatureResult
            : (signatureResult as any)?.signature;
        if (!signatureBytes) {
            throw new Error('Main wallet did not return a usable signature.');
        }
        const signatureBase64 = toBase64(signatureBytes);
        const nextCard = await submitCardLimitChange(address, address, message, signatureBase64);
        const normalizedCard = await normalizeDbCardProfile(nextCard);
        if (normalizedCard) {
            const mergedCard = card
                ? {
                    ...card,
                    ...normalizedCard,
                    card_creation_tx_id: card.card_creation_tx_id || chainLimit.transactionId,
                    limits: normalizedCard.limits
                }
                : normalizedCard;
            setCard(mergedCard);
            return mergedCard;
        }
        throw new Error('Card limit update response was empty.');
    };

    const sweepCardFundsToMain = async (pin?: string, cardSecret?: string) => {
        if (!address || !card) {
            throw new Error('Connect your main wallet and create a card first.');
        }

        const shouldUseTempUnlock = !decryptedCardKey && pin && cardSecret;
        const activeCardKey = decryptedCardKey || (shouldUseTempUnlock ? await unlockCard(pin!, cardSecret!, { persist: false }) : null);
        if (!activeCardKey) {
            throw new Error('Unlock the card before sweeping funds.');
        }

        try {
            const latestBalances = cardBalances ?? { NIGHT: 0 };
            setCardBalances(latestBalances);
            if ((latestBalances.NIGHT || 0) <= 0) {
                throw new Error('This card has no private funds to sweep.');
            }
            throw new Error('Card sweep needs the native Midnight private-transfer adapter. Legacy transfer code has been removed for Preprod safety.');
        } finally {
            if (shouldUseTempUnlock && activeCardKey) {
                resetKeyMaterial(activeCardKey);
            }
        }
    };

    const deleteCard = async () => {
        if (!api || !address || !wallet?.adapter?.signMessage) {
            throw new Error('Connect your main wallet first.');
        }
        if (!card) {
            throw new Error('Create your LumaPay card first.');
        }
        if (!appPassword || !card.card_id || !card.card_owner_secret_ciphertext) {
            throw new Error('Card vault opening metadata is missing. Recreate the card after the Midnight migration.');
        }

        console.group('[CardWalletProvider] Delete card flow start');
        console.log('[CardWalletProvider] Main address:', address);
        console.log('[CardWalletProvider] Card address:', card.card_address);
        console.log('[CardWalletProvider] Current scanned balances:', cardBalances);

        const message = buildCardDeletionMessage(card);
        console.log('[CardWalletProvider] Card deletion message payload:', message);
        const signatureResult = await wallet.adapter.signMessage(new TextEncoder().encode(message));
        const signatureBytes = signatureResult instanceof Uint8Array
            ? signatureResult
            : (signatureResult as any)?.signature;

        if (!signatureBytes) {
            console.groupEnd();
            throw new Error('Main wallet did not return a usable signature for card deletion.');
        }
        console.log('[CardWalletProvider] Card deletion message signed successfully.');

        const ownerSecret = await decryptWithPassword(card.card_owner_secret_ciphertext, appPassword);
        const result = await closeCardVaultOnChain(api, card.card_id, ownerSecret);
        if (!result.transactionId) {
            console.groupEnd();
            throw new Error('The wallet did not return a transaction id for card deletion.');
        }

        console.log('[CardWalletProvider] Initial deletion transaction id:', result.transactionId);
        const finalTransactionId = result.transactionId;
        console.log('[CardWalletProvider] Final deletion transaction id:', finalTransactionId);

        const signatureBase64 = toBase64(signatureBytes);
        console.log('[CardWalletProvider] Sending signed deletion confirmation to backend.');
        await deleteCardWalletEntry(address, address, message, signatureBase64, finalTransactionId);

        clearCachedCard(address);
        setCard(null);
        setCardBalances(null);
        lockCard();
        console.log('[CardWalletProvider] Card deletion completed successfully.');
        console.groupEnd();
    };

    return (
        <CardWalletContext.Provider
            value={{
                card,
                isLoading,
                isUnlocked: Boolean(decryptedCardKey),
                decryptedCardKey,
                cardBalances,
                isRefreshingBalances,
                createCard,
                unlockCard,
                lockCard,
                refreshCard,
                refreshCardBalances,
                topUpCard,
                requestCardLimitChange,
                sweepCardFundsToMain,
                deleteCard
            }}
        >
            {children}
        </CardWalletContext.Provider>
    );
};

export function useCardWallet() {
    const context = useContext(CardWalletContext);
    if (!context) {
        throw new Error('useCardWallet must be used within a CardWalletProvider');
    }
    return context;
}
