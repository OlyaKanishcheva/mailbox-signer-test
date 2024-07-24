import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';

// export interface IMailboxMeta {
//     userAddress: string; // user address in multiacc
//     referrer: string; // source
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
//     meta: IMailboxMeta;
// }

const commonTestnetSender = testnetConfig.test?.senderAddress;
const commonTestnetRecipient = testnetConfig.test?.recipientAddress;

const commonMeta = {
    userAddress: commonTestnetSender,
    referrer: 'http://localhost:3002/',
    iconSrc: 'https://cdn-icons-png.freepik.com/512/1581/1581884.png?ga=GA1.1.1444280545.1721821233',
}

const transfersTestnet = {
    'one_waves': {
        req: 'sign',
        data: {
            type: 4,
            recipient: commonTestnetRecipient,
            amount: 100000000,
        },
        meta: commonMeta,
    }
}

const transfersMainnet = {};


export const transfers = {
    testnet: transfersTestnet,
    mainnet: transfersMainnet,
}