import React from 'react';
import { ConfigService, MailboxWXNListener } from '../../services';
import { invokes as _invokes } from './invokesData';

interface ISendInvokeParams {
    mailboxListener: MailboxWXNListener;
}

const SendInvokeFC: React.FC<ISendInvokeParams> = ({ mailboxListener }) => {
    const [error, setError] = React.useState<string>();
    const invokes = React.useMemo(() => {
        return _invokes[ConfigService.getInstance().network] || _invokes.testnet;
    }, []);

    const handleSend = React.useCallback((key = 'stake_one_usdt'): void => {
        if (mailboxListener.isReady) {
            setError('');
            mailboxListener.sendMsg([invokes[key]]);
        } else {
            setError('Connect with wx.network');
        }
    }, []);

    return (
        <div style={{ marginBottom: '50px' }}>
            <h3>Invokes</h3>
            <button onClick={() => handleSend()}>
                Stake 1 USDT
            </button>
            <button onClick={() => handleSend('unstake_one_usdt')}>
                Unstake 1 USDT
            </button>
            <button onClick={() => handleSend('error_stake_one_usdt')}>
                Stake 1 USDT with error
            </button>
            <button onClick={() => handleSend('stake_one_usdt_with_custom_fee')}>
                Stake 1 USDT with custom fee
            </button>
            <button onClick={() => handleSend('stake_one_usdt_no_meta')}>
                Stake 1 USDT no meta
            </button>
            {error &&
                <div style={{ color: 'red' }}>{error}</div>
            }
        </div>
    )
}

export const SendInvoke = React.memo(SendInvokeFC);