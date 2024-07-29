import React from 'react';
import { ConfigService, ConnectMailbox } from '../../services';
import { transfers as _transfers } from './transfersData';

interface ISendTransferParams {
    mailbox: ConnectMailbox;
}

const SendTransferFC: React.FC<ISendTransferParams> = ({ mailbox }) => {
    const [error, setError] = React.useState<string>();
    const transfers = React.useMemo(() => {
        return _transfers[ConfigService.getInstance().network] || _transfers.testnet;
    }, []);

    const handleSend = React.useCallback((key = 'one_waves'): void => {
        if (mailbox.isCreated) {
            setError('');
            mailbox.sendMsg(transfers[key]);
        } else {
            setError('Connect with wx.network');
        }
    }, []);

    return (
        <div style={{ marginBottom: '50px' }}>
            <h3>Transfers</h3>
            <button onClick={() => handleSend()}>
                Send 1 Waves
            </button>
            <button onClick={() => handleSend('0_1_waves_with_attachment')}>
                Send 0.1 Waves with attachment
            </button>
            <button onClick={() => handleSend('0_1_waves_custom_fee')}>
                Send 0.1 Waves with custom fee
            </button>
            <button onClick={() => handleSend('one_xtn')}>
                Send 1 XTN
            </button>
            <button onClick={() => handleSend('0_1_waves_not_enough_fee')}>
                Send 0.1 Waves with not enough fee
            </button>
            {error &&
                <div style={{ color: 'red' }}>{error}</div>
            }
        </div>
    )
}

export const SendTransfer = React.memo(SendTransferFC);