const HEX_32_BYTES = /^[0-9a-fA-F]{64}$/;

function firstSet(...names: string[]): { name: string; value: string } | undefined {
    for (const name of names) {
        const value = process.env[name]?.trim();
        if (value) return { name, value };
    }
    return undefined;
}

export type DeploymentSecrets = {
    wallet: { kind: 'mnemonic' | 'seed'; value: string };
    registryAdminSecret: Uint8Array;
    privateStatePassword: string;
};

export function readDeploymentSecrets(): DeploymentSecrets {
    const mnemonic = process.env.MIDNIGHT_WALLET_MNEMONIC?.trim();
    const seed = process.env.MIDNIGHT_WALLET_SEED?.trim();
    if (Boolean(mnemonic) === Boolean(seed)) {
        throw new Error(
            'Supply exactly one of MIDNIGHT_WALLET_MNEMONIC or MIDNIGHT_WALLET_SEED.'
        );
    }
    if (seed && !HEX_32_BYTES.test(seed)) {
        throw new Error('MIDNIGHT_WALLET_SEED must be exactly 32 bytes of hexadecimal.');
    }

    const admin = firstSet(
        'LUMAPAY_REGISTRY_ADMIN_SECRET_HEX',
        // Temporary migration alias for credentials created before the LumaPay rename.
        'AQUA_MIDNIGHT_ISSUER_AUTH_SECRET_HEX'
    );
    if (!admin || !HEX_32_BYTES.test(admin.value)) {
        throw new Error(
            'LUMAPAY_REGISTRY_ADMIN_SECRET_HEX must be exactly 32 bytes of hexadecimal.'
        );
    }

    const storage = firstSet(
        'LUMAPAY_MIDNIGHT_PRIVATE_STATE_PASSWORD',
        'MIDNIGHT_PRIVATE_STATE_PASSWORD',
        // Temporary migration alias for credentials created before the LumaPay rename.
        'AQUA_MIDNIGHT_PRIVATE_STATE_PASSWORD'
    );
    if (!storage || storage.value.length < 16) {
        throw new Error('A private-state password of at least 16 characters is required.');
    }

    // The provider requires upper/lower/digit/special character diversity. Prefixing
    // preserves the supplied entropy while making high-entropy hex passwords valid.
    const privateStatePassword = `LumaPay!${storage.value}`;

    return {
        wallet: mnemonic
            ? { kind: 'mnemonic', value: mnemonic }
            : { kind: 'seed', value: seed! },
        registryAdminSecret: Uint8Array.from(Buffer.from(admin.value, 'hex')),
        privateStatePassword
    };
}
