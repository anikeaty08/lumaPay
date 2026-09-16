import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(resolve(root, 'src', 'lumapay.compact'), 'utf8');

function take(start, end) {
    const from = source.indexOf(start);
    const to = end ? source.indexOf(end, from + start.length) : source.length;
    if (from < 0 || to < 0) throw new Error(`Unable to extract ${start}`);
    return source.slice(from, to).trim();
}

function contract(name, declarations, sections) {
    const output = [
        'pragma language_version 0.23;',
        '',
        'import CompactStandardLibrary;',
        '',
        `// Generated from lumapay.compact for the deployable ${name} module.`,
        declarations.trim(),
        ...sections.map((section) => section.trim())
    ].join('\n\n') + '\n';
    writeFileSync(resolve(root, 'src', `lumapay-${name}.compact`), output, 'utf8');
}

const merchantAuthorization = take(
    'export pure circuit deriveMerchantAuthorization',
    'export pure circuit deriveRegistryAdminAuthorization'
);
const registryAuthorization = take(
    'export pure circuit deriveRegistryAdminAuthorization',
    'export pure circuit deriveQuoteProviderAuthorization'
);
const quoteProviderAuthorization = take(
    'export pure circuit deriveQuoteProviderAuthorization',
    'export pure circuit deriveBackupAuthorization'
);
const backupAuthorization = take(
    'export pure circuit deriveBackupAuthorization',
    'export pure circuit deriveInvoiceCommitment'
);
const invoiceHelpers = take(
    'export pure circuit deriveInvoiceCommitment',
    'export pure circuit deriveCampaignCommitment'
);
const campaignHelpers = take(
    'export pure circuit deriveCampaignCommitment',
    'export pure circuit deriveGiftCardCommitment'
);
const giftHelpers = take(
    'export pure circuit deriveGiftCardCommitment',
    'export pure circuit deriveQuoteCommitment'
);
const quoteCommitment = take(
    'export pure circuit deriveQuoteCommitment',
    'export circuit createInvoice'
);
const invoiceOperations = take(
    'export circuit createInvoice',
    'export circuit createCampaign'
);
const campaignOperations = take(
    'export circuit createCampaign',
    'export circuit createGiftCard'
);
const giftOperations = take(
    'export circuit createGiftCard',
    'export circuit rotateRegistryAdmin'
);
const quoteOperations = take(
    'export circuit rotateRegistryAdmin',
    'export circuit registerBackupAnchor'
);
const backupOperations = take(
    'export circuit registerBackupAnchor',
    '// These proof circuits'
);
const invoiceProof = take(
    'export circuit proveInvoiceSettlement',
    'export circuit proveContributionSettlement'
);
const contributionProof = take('export circuit proveContributionSettlement');

contract('campaigns', `
export enum CampaignStatus { OPEN, CANCELLED, EXPIRED }

export struct CampaignPublicState {
    commitmentVersion: Uint<16>;
    commitment: Bytes<32>;
    merchantAuthorization: Bytes<32>;
    expiry: Uint<64>;
    status: CampaignStatus;
    contributionCount: Uint<64>;
}

export struct ContributionPublicState {
    campaignId: Bytes<32>;
    nullifier: Bytes<32>;
    escrowCoinCommitment: Bytes<32>;
    receiptCommitment: Bytes<32>;
    claimed: Boolean;
}

export ledger campaignIds: Set<Bytes<32>>;
export ledger campaigns: Map<Bytes<32>, CampaignPublicState>;
export ledger contributionIds: Set<Bytes<32>>;
export ledger contributions: Map<Bytes<32>, ContributionPublicState>;
export ledger contributionNullifiers: Set<Bytes<32>>;
export ledger claimNullifiers: Set<Bytes<32>>;
`, [merchantAuthorization, invoiceHelpers.match(/export pure circuit deriveEscrowCoinCommitment[\s\S]*?(?=export pure circuit deriveReceiptCommitment)/)[0], campaignHelpers, campaignOperations, contributionProof]);

contract('gift-cards', `
export enum GiftCardStatus { OPEN, REDEEMED, RECLAIMED }

export struct GiftCardPublicState {
    commitmentVersion: Uint<16>;
    commitment: Bytes<32>;
    issuerAuthorization: Bytes<32>;
    expiry: Uint<64>;
    escrowCoinCommitment: Bytes<32>;
    redemptionNullifier: Bytes<32>;
    status: GiftCardStatus;
}

export ledger giftCardIds: Set<Bytes<32>>;
export ledger giftCards: Map<Bytes<32>, GiftCardPublicState>;
export ledger giftCardNullifiers: Set<Bytes<32>>;
`, [invoiceHelpers.match(/export pure circuit deriveEscrowCoinCommitment[\s\S]*?(?=export pure circuit deriveReceiptCommitment)/)[0], giftHelpers, giftOperations]);

contract('backup-anchor', `
export struct BackupAnchorPublicState {
    formatVersion: Uint<16>;
    authorization: Bytes<32>;
    encryptedBlobDigest: Bytes<32>;
}

export ledger backupOwnerIds: Set<Bytes<32>>;
export ledger backupAnchors: Map<Bytes<32>, BackupAnchorPublicState>;
`, [backupAuthorization, backupOperations]);

contract('quote-checkout', `
export enum InvoiceStatus { OPEN, SETTLED, CANCELLED, EXPIRED }

export struct InvoicePublicState {
    commitmentVersion: Uint<16>;
    commitment: Bytes<32>;
    merchantAuthorization: Bytes<32>;
    expiry: Uint<64>;
    status: InvoiceStatus;
    settlementNullifier: Bytes<32>;
    escrowCoinCommitment: Bytes<32>;
    receiptCommitment: Bytes<32>;
    claimed: Boolean;
}

export struct QuotePublicState {
    commitmentVersion: Uint<16>;
    commitment: Bytes<32>;
    providerId: Bytes<32>;
    expiry: Uint<64>;
    consumed: Boolean;
}

export ledger invoiceIds: Set<Bytes<32>>;
export ledger invoices: Map<Bytes<32>, InvoicePublicState>;
export ledger paymentNullifiers: Set<Bytes<32>>;
export ledger claimNullifiers: Set<Bytes<32>>;
export ledger quoteIds: Set<Bytes<32>>;
export ledger quotes: Map<Bytes<32>, QuotePublicState>;
export ledger quoteProviderIds: Set<Bytes<32>>;
export ledger quoteProviderAuthorizations: Map<Bytes<32>, Bytes<32>>;
export ledger registryAdminAuthorization: Bytes<32>;

constructor(registryAdminAuthorizationCommitment: Bytes<32>) {
    assert(registryAdminAuthorizationCommitment != default<Bytes<32>>, "registry admin authorization is required");
    registryAdminAuthorization = disclose(registryAdminAuthorizationCommitment);
}
`, [merchantAuthorization, registryAuthorization, quoteProviderAuthorization, invoiceHelpers, quoteCommitment, invoiceOperations, quoteOperations, invoiceProof]);
