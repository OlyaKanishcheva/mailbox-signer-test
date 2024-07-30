import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';

// export interface IMailboxMeta {
//     userAddress?: string; // user address in multiacc
//     referrer?: string; // source
//     iconSrc?: string;
// }

// export interface IMailboxCancelLease {
//     type: TRANSACTION_TYPE_NUMBER.CANCEL_LEASING;
//     leaseId: string;
// }

// export interface IMailboxSignData {
//     req: 'sign';
//     data: IMailboxCancelLease;
//     meta?: IMailboxMeta;
// }

const getCommonMeta = (commonSender) => {
    return ({
        userAddress: commonSender,
        referrer: 'http://localhost:3002/',
        iconSrc: 'https://cdn-icons-png.freepik.com/512/1581/1581884.png?ga=GA1.1.1444280545.1721821233',
    })
}

const getCancelLease = ({
    commonMeta
}) => {
    return ({
        'one_waves_cancel_lease': {
            req: 'sign',
            data: {
                type: 9,
            },
            meta: commonMeta,
        }
    })
}

export const cancelLease = {
    testnet: getCancelLease({
        commonMeta: getCommonMeta(testnetConfig.test?.senderAddress),
    }),
    mainnet: getCancelLease({
        commonMeta: getCommonMeta(mainnetConfig.test?.senderAddress),
    }),
}