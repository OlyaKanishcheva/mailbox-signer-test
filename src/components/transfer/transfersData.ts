import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';

// export interface IMailboxMeta {
//     userAddress?: string; // user address in multiacc
//     referrer?: string; // source
//     iconSrc?: string;
// }

// export interface IMailboxTransfer {
//     type: TRANSACTION_TYPE_NUMBER.TRANSFER;
//     recipient: string;
//     amount: number;
//     assetId?: string;
//     attachment?: string;
// }

// export interface IMailboxSignData {
//     req: 'sign';
//     data: IMailboxTransfer;
//     meta?: IMailboxMeta;
// }

const getCommonMeta = (commonSender) => {
    return ({
        userAddress: commonSender,
        referrer: 'http://localhost:3002/',
        iconSrc: 'https://cdn-icons-png.freepik.com/512/1581/1581884.png?ga=GA1.1.1444280545.1721821233',
    })
}

const getTransfers = ({
    commonRecipient,
    xtnAssetId,
    commonMeta
}) => {
    return ({
        'one_waves': {
            req: 'sign',
            data: {
                type: 4,
                recipient: commonRecipient,
                amount: 100000000,
            },
            meta: commonMeta,
        },
        '0_1_waves_with_attachment': {
            req: 'sign',
            data: {
                type: 4,
                recipient: commonRecipient,
                amount: 10000000,
                attachment: 'Hi',
            },
            meta: commonMeta,
        },
        'one_xtn': {
            req: 'sign',
            data: {
                type: 4,
                recipient: commonRecipient,
                amount: 1000000,
                assetId: xtnAssetId,
            },
            meta: commonMeta,
        },
        '0_1_waves_custom_fee': {
            req: 'sign',
            data: {
                type: 4,
                recipient: commonRecipient,
                amount: 10000000,
                fee: 100000,
                feeAssetId: xtnAssetId,
            },
            meta: commonMeta,
        },
        '0_1_waves_not_enough_fee': {
            req: 'sign',
            data: {
                type: 4,
                recipient: commonRecipient,
                amount: 10000000,
                fee: 1,
            },
            meta: commonMeta,
        },
    })
}

export const transfers = {
    testnet: getTransfers({
        commonRecipient: testnetConfig.test?.recipientAddress,
        xtnAssetId: testnetConfig.test?.xtnAssetId,
        commonMeta: getCommonMeta(testnetConfig.test?.senderAddress),
    }),
    mainnet: getTransfers({
        commonRecipient: mainnetConfig.test?.recipientAddress,
        xtnAssetId: mainnetConfig.test?.xtnAssetId,
        commonMeta: getCommonMeta(mainnetConfig.test?.senderAddress),
    }),
}