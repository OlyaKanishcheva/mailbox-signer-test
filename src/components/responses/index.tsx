import React from 'react';
import { TMsg } from '../../services/mailbox/interface';

const ResponsesFC: React.FC<{ resps: Array<TMsg> }> = ({ resps }) => {
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
