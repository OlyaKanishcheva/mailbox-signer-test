export type TNetwork = 'testnet' | 'mainnet';

export interface IConfig {
    network: TNetwork;
    api: {
        wsMailboxUr: string;
    };
    test: {
        senderAddress: string;
        recipientAddress: string;
        xtnAssetId: string;
        contract: string;
        usdtAssetId: string;
    };
}