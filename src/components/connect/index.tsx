import React from 'react';
import { ConnectMailbox } from '../../services';
import { TMsg } from '../../services/mailbox/interface';

interface IConnectParams {
    mailbox: ConnectMailbox;
    onSuccess: (data: TMsg) => void;
    onError: (data: TMsg) => void;
}

type TState = 'initial' | 'pending' | 'connected';

const ConnectFC: React.FC<IConnectParams> = ({ mailbox, onSuccess, onError }) => {
    const [state, setState] = React.useState<TState>('initial');
    const [code, setCode] = React.useState<string>('');

    const handleConnect = React.useCallback((): void => {
        if (mailbox.isCreated) {
            return;
        }
        mailbox.connect(Number(code), {
            onCreate: () => {
                setState('connected');
            },
            onMsg: (message: TMsg) => {
                if (message.resp === 'success') {
                    onSuccess(message);
                }
                if (message.resp === 'declined') {
                    onError(message);
                }
            },
            onClose: () => {
                console.info('close');
                setState('initial');
            },
            onError: () => {
                console.info('error');
                setState('initial');
            },
        });
    }, [code]);

    return (
        <div style={{ marginBottom: '50px' }}>
            {state === 'connected' &&
                <div>Connected to {code}</div>
            }
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
        </div>
    )
}

export const Connect = React.memo(ConnectFC);