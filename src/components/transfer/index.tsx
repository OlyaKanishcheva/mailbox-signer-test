import React from 'react';
import { ConfigService, ConnectMailbox } from '../../services';
import { transfers as _transfers } from './transfersData';

interface ISendTransferParams {
    mailbox: ConnectMailbox;
}

type TState = 'initial' | 'pending';

const SendTransferFC: React.FC<ISendTransferParams> = ({ mailbox }) => {
    const [state, setState] = React.useState<TState>('initial');
    const [code, setCode] = React.useState<string>('');
    const transfers = _transfers[ConfigService.getInstance().network] || _transfers.testnet;

    const handleSend = React.useCallback((): void => {
        if (mailbox.isCreated) {
           mailbox.sendMsg(transfers['one_waves']);
        } else {
            setState('pending');
        }
    }, []);

    const handleConnect = React.useCallback((): void => {
        mailbox.connect(Number(code), {
            onCreate: () => {
                setState('initial');
                handleSend();
            }
        });
    }, [code, handleSend]);

    return (
        <div>
            <button onClick={handleSend}>
                Send 1 Waves 
            </button>
            {state === 'pending' ?
                (
                    <div>
                        <input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder='Enter code from wx.network'
                        />
                        <button onClick={handleConnect}>
                            Connect
                        </button>
                    </div>
                ) :
                null
            }
        </div>
    )
}

export const SendTransfer = React.memo(SendTransferFC);