interface DeleteBurnerInvoiceParams {
    decryptedBurnerKey: string;
    invoiceHash: string;
}

export const sponsorBurnerInvoiceDeletion = async ({
    decryptedBurnerKey,
    invoiceHash
}: DeleteBurnerInvoiceParams): Promise<string> => {
    void decryptedBurnerKey;
    void invoiceHash;
    throw new Error('Burner-owned invoice deletion must use the native LumaPay Midnight contract adapter. Legacy compatibility execution has been removed.');
};
