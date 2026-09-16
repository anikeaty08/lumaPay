export type DeploymentSecrets = {
    wallet: {
        kind: 'mnemonic' | 'seed';
        value: string;
    };
    registryAdminSecret: Uint8Array;
    privateStatePassword: string;
};
export declare function readDeploymentSecrets(): DeploymentSecrets;
//# sourceMappingURL=env.d.ts.map