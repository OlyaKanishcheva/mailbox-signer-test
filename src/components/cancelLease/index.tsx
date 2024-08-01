import React from 'react';
import { ConfigService, MailboxWXNListener } from '../../services';
import { cancelLease as _cancelLease } from './cancelLeaseData';

interface ISendCancelLeaseParams {
    mailboxListener: MailboxWXNListener;
}

const SendCancelLeaseFC: React.FC<ISendCancelLeaseParams> = ({ mailboxListener }) => {
    const [error, setError] = React.useState<string>();
    const [leaseId, setLeaseId] = React.useState<string>('');
    const cancelLease = React.useMemo(() => {
        return _cancelLease[ConfigService.getInstance().network] || _cancelLease.testnet;
    }, []);

    const handleSend = React.useCallback((key = 'one_waves_cancel_lease'): void => {
        if (mailboxListener.isReady) {
            setError('');
            const _data = cancelLease[key];
            mailboxListener.sendMsg([{
                ..._data,
                data: {
                    ..._data.data,
                    leaseId
                }
            }]);
        } else {
            setError('Connect with wx.network');
        }
    }, [leaseId]);

    return (
        <div style={{ marginBottom: '50px' }}>
            <h3>Cancel Lease</h3>
            <button onClick={() => handleSend()}>
                Cancel Lease 1 Waves
            </button>
            <input
                value={leaseId}
                onChange={(e) => setLeaseId(e.target.value)}
                placeholder='Enter leaseId'
            />
            {error &&
                <div style={{ color: 'red' }}>{error}</div>
            }
        </div>
    )
}

export const SendCancelLease = React.memo(SendCancelLeaseFC);