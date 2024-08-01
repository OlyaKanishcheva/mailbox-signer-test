import React from 'react';
import './App.css';
import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';
import { IConfig } from '../../services/config/interface';
import { ConfigService } from '../../services/';
import { SendTransfer, Connect, Responses, SendInvoke, SendLease, SendCancelLease } from '../../components';
import { TReceivedMsg } from '../../services/mailbox/interface';
import { MailboxWXNListener } from '../../services/mailboxWXNListener/MailboxWXNListener';

function App() {
    const config = process.env.REACT_APP_NETWORK === 'testnet' ? testnetConfig : mainnetConfig;
    const configService = new ConfigService(config as IConfig);
    const mailboxListener = new MailboxWXNListener();

    const [resps, setResps] = React.useState<Array<TReceivedMsg>>([]);

    const onResponse = React.useCallback((data: TReceivedMsg): void => {
        setResps((prev) => [...prev, data]);
    }, []);

    return (
        <div className="App">
            <Connect
                mailboxListener={mailboxListener}
                onSuccess={onResponse}
                onError={onResponse}
            />
            <SendTransfer mailboxListener={mailboxListener} />
            <SendInvoke mailboxListener={mailboxListener} />
            <SendLease mailboxListener={mailboxListener} />
            <SendCancelLease mailboxListener={mailboxListener} />
            <Responses resps={resps} />
        </div>
    );
}

export default App;
