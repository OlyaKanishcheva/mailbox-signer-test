import React from 'react';
import { ConfigService, ConnectMailbox } from '../../services';
import { lease as _lease } from './leaseData';

interface ISendLeaseParams {
    mailbox: ConnectMailbox;
}

const SendLeaseFC: React.FC<ISendLeaseParams> = ({ mailbox }) => {
    const [error, setError] = React.useState<string>();
    const lease = React.useMemo(() => {
        return _lease[ConfigService.getInstance().network] || _lease.testnet;
    }, []);

    const handleSend = React.useCallback((key = 'one_waves_lease'): void => {
        if (mailbox.isCreated) {
            setError('');
            mailbox.sendMsg(lease[key]);
        } else {
            setError('Connect with wx.network');
        }
    }, []);

    return (
        <div style={{ marginBottom: '50px' }}>
            <h3>Lease</h3>
            <button onClick={() => handleSend()}>
                Lease 1 Waves
            </button>
            {error &&
                <div style={{ color: 'red' }}>{error}</div>
            }
        </div>
    )
}

export const SendLease = React.memo(SendLeaseFC);