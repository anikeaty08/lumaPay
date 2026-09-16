export function getPreprodConfig() {
    const network = process.env.MIDNIGHT_NETWORK ?? 'preprod';
    if (network !== 'preprod') {
        throw new Error(`The preprod deployer refuses MIDNIGHT_NETWORK=${network}. Expected preprod.`);
    }
    return {
        networkId: 'preprod',
        indexer: process.env.MIDNIGHT_INDEXER ?? 'https://api-preprod.1am.xyz/api/v4/graphql',
        indexerWS: process.env.MIDNIGHT_INDEXER_WS ?? 'wss://api-preprod.1am.xyz/api/v4/graphql/ws',
        node: 'https://rpc.preprod.midnight.network',
        nodeWS: 'wss://rpc.preprod.midnight.network',
        proofServer: process.env.MIDNIGHT_PROOF_SERVER ?? 'http://127.0.0.1:6300',
        faucet: 'https://midnight-tmnight-preprod.nethermind.dev/'
    };
}
//# sourceMappingURL=config.js.map
