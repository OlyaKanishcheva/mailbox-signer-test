import React from 'react';
import './App.css';
import mainnetConfig from '../../config/mainnet.json';
import testnetConfig from '../../config/testnet.json';
import { IConfig } from '../../services/config/interface';
import { ConfigService, ConnectMailbox } from '../../services/';
import { SendTransfer } from '../../components';

function App() {
    const config = process.env.REACT_APP_NETWORK === 'mainnet' ? mainnetConfig : testnetConfig;
    const configService = new ConfigService(config as IConfig);
    const mailbox = new ConnectMailbox();

    return (
        <div className="App">
            <SendTransfer mailbox={mailbox} />
        </div>
    );
}

export default App;
