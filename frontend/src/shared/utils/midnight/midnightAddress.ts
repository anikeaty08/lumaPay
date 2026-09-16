import { MidnightBech32m } from '@midnight-ntwrk/wallet-sdk-address-format';

const MIDNIGHT_ADDRESS_PATTERN = /^mn_(?:addr|shield|dust)_(?:preprod|preview|mainnet)1[0-9a-z]+$/;

export const normalizeMidnightAddress = (value?: string | null) => (value || '').trim();

export const looksLikeMidnightAddress = (value?: string | null) => {
    const normalized = normalizeMidnightAddress(value);
    return normalized.length > 0 && MIDNIGHT_ADDRESS_PATTERN.test(normalized);
};

export const isValidMidnightAddress = async (value?: string | null) => {
    const normalized = normalizeMidnightAddress(value);
    if (!looksLikeMidnightAddress(normalized)) {
        return false;
    }

    try {
        const parsed = MidnightBech32m.parse(normalized);
        return parsed.network === 'preprod' && ['addr', 'shield', 'dust'].includes(parsed.type);
    } catch {
        return false;
    }
};
