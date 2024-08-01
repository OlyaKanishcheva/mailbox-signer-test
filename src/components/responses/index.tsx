import React from 'react';
import { TReceivedMsg } from '../../services/mailbox/interface';

const ResponsesFC: React.FC<{ resps: Array<TReceivedMsg> }> = ({ resps }) => {
    return (
        resps?.length ?
            <div style={{ border: '1px solid', wordBreak: 'break-all', padding: '8px' }}>
                {resps.map((resp, index) => {
                    return (
                        <div key={index}>
                            <div style={{ marginTop: '16px', color: 'green' }}>
                                {resp.resp}
                            </div>
                            <div style={{ marginTop: '8px' }}>
                                {/* @ts-ignore */}
                                {JSON.stringify(resp.value)}
                            </div>
                        </div>
                    )
                })}
            </div> :
            null
    );
}

export const Responses = React.memo(ResponsesFC);
