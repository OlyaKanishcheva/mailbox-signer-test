import React from 'react';
import { MailboxWXNListener } from '../../services';
import { TReceivedMsg } from '../../services/mailbox/interface';
import { convertBase32ToId } from '../../utils';

interface IConnectParams {
    mailboxListener: MailboxWXNListener;
    onSuccess: (data: TReceivedMsg) => void;
    onError: (data: TReceivedMsg) => void;
}

type TState = 'initial' | 'pending' | 'connected';

const ConnectFC: React.FC<IConnectParams> = ({ mailboxListener, onSuccess, onError }) => {
    const [state, setState] = React.useState<TState>('initial');
    const [code, setCode] = React.useState<string>('');
    const [imgSrc, setImgSrc] = React.useState<string>('');

    const handleConnect = React.useCallback((): void => {
        const id = convertBase32ToId(code);
        mailboxListener.connect(id, {
            onCreate: () => {
                setState('connected');
                mailboxListener.setCode(code);
                mailboxListener.generatePair();
            },
            onMsg: (message: TReceivedMsg) => {
                if (message.resp === 'pk') {
                    mailboxListener.onGetWXNPk(message);
                    const imgSrc = mailboxListener.idIconSrc;
                    setImgSrc(imgSrc);
                }
                if (message.resp === 'success') {
                    onSuccess(message);
                }
                if (message.resp === 'declined') {
                    onError(message);
                }
                if (message.resp === 'ready') {
                    mailboxListener.setConnectionIsReady();
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
                {imgSrc &&
                    <div
                        style={{
                            borderRadius: "10px",
                            overflow: "hidden",
                            margin: "auto",
                            marginTop: "16px",
                            width: "100px",
                            height: "100px",
                        }}
                    >
                        <img
                            src={imgSrc}
                            width={100}
                            height={100}
                            alt="identicon"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export const Connect = React.memo(ConnectFC);