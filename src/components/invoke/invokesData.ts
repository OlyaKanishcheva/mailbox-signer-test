import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';

// export interface IMailboxMeta {
//     userAddress: string; // user address in multiacc
//     referrer: string; // source
//     iconSrc?: string;
// }

// interface IMailboxInvokePayment {
//     assetId: string;
//     amount: number;
// }

// interface IARGS_ENTRY {
//     type: string;
//     value: any;
// }

//
// export interface IMailboxInvoke {
//     type: TRANSACTION_TYPE_NUMBER.SCRIPT_INVOCATION;
//     payment: [IMailboxInvokePayment] | [];
//     dApp: string;
//     call: {
//         function: string;
//         args?: Array<IARGS_ENTRY>;
//     } | null;
//     fee?: number;
//     feeAssetId?: string;
// }

// export interface IMailboxSignData {
//     req: 'sign';
//     data: IMailboxInvoke;
//     meta: IMailboxMeta;
// }

const commonTestnetSender = testnetConfig.test?.senderAddress;
const contract = testnetConfig.test?.contract;
const usdtAssetId = testnetConfig.test?.usdtAssetId;

const commonMeta = {
    userAddress: commonTestnetSender,
    referrer: 'http://localhost:3002/',
    iconSrc: 'https://cdn-icons-png.freepik.com/512/1581/1581884.png?ga=GA1.1.1444280545.1721821233',
}

const invokesTestnet = {
    'stake_one_usdt': {
        req: 'sign',
        data: {
            type: 16,
            call: { function: 'stake', args: [] },
            dApp: contract,
            payment: [
                { assetId: usdtAssetId, amount: 1000000 }
            ],
        },
        meta: commonMeta,
    },
    'unstake_one_usdt': {
        req: 'sign',
        data: {
            type: 16,
            call: {
                function: 'unstake',
                args: [{ type: 'integer', value: 1000000 }],
            },
            dApp: contract,
            payment: [],
        },
        meta: commonMeta,
    }
}

const invokesMainnet = {};


export const invokes = {
    testnet: invokesTestnet,
    mainnet: invokesMainnet,
}