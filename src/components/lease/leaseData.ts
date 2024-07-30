import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';

// export interface IMailboxMeta {
//     userAddress?: string; // user address in multiacc
//     referrer?: string; // source
//     iconSrc?: string;
// }

// export interface IMailboxLease {
//     type: TRANSACTION_TYPE_NUMBER.LEASE;
//     amount: number;
//     recipient: string;
//     fee?: number;
//     feeAssetId?: string;
// }

// export interface IMailboxSignData {
//     req: 'sign';
//     data: IMailboxLease;
//     meta?: IMailboxMeta;
// }

const getCommonMeta = (commonSender) => {
    return ({
        userAddress: commonSender,
        referrer: 'http://localhost:3002/',
        iconSrc: 'https://cdn-icons-png.freepik.com/512/1581/1581884.png?ga=GA1.1.1444280545.1721821233',
    })
}

const getLease = ({
    commonRecipient,
    xtnAssetId,
    commonMeta
}) => {
    return ({
        'one_waves_lease': {
            req: 'sign',
            data: {
                type: 8,
                recipient: commonRecipient,
                amount: 100000000,
            },
            meta: commonMeta,
        },
    })
}

export const lease = {
    testnet: getLease({
        commonRecipient: testnetConfig.test?.recipientAddress,
        xtnAssetId: testnetConfig.test?.xtnAssetId,
        commonMeta: getCommonMeta(testnetConfig.test?.senderAddress),
    }),
    mainnet: getLease({
        commonRecipient: mainnetConfig.test?.recipientAddress,
        xtnAssetId: mainnetConfig.test?.xtnAssetId,
        commonMeta: getCommonMeta(mainnetConfig.test?.senderAddress),
    }),
}