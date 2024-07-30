import React from 'react';
import './App.css';
import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';
import { IConfig } from '../../services/config/interface';
import { ConfigService, ConnectMailbox } from '../../services/';
import { SendTransfer, Connect, Responses, SendInvoke, SendLease, SendCancelLease } from '../../components';
import { TMsg } from '../../services/mailbox/interface';

function App() {
    const config = process.env.REACT_APP_NETWORK === 'testnet' ? testnetConfig : mainnetConfig;
    const configService = new ConfigService(config as IConfig);
    const mailbox = new ConnectMailbox();

    const [resps, setResps] = React.useState<Array<TMsg>>([]);

    const onResponse = React.useCallback((data: TMsg): void => {
        setResps((prev) => [...prev, data]);
    }, []);

    return (
        <div className="App">
            <Connect
                mailbox={mailbox}
                onSuccess={onResponse}
                onError={onResponse}
            />
            <SendTransfer mailbox={mailbox} />
            <SendInvoke mailbox={mailbox} />
            <SendLease mailbox={mailbox} />
            <SendCancelLease mailbox={mailbox} />
            <Responses resps={resps} />
        </div>
    );
}

export default App;
