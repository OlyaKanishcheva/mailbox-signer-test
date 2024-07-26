export interface ICreateMsg {
    resp: 'create';
    id: number;
}

// transaction send success message
export interface ITxSuccessMsg {
    resp: 'success';
    value: {
        data: any; // data that was sent in wx.network
    }
}

// transaction send decline message
export interface ITxDeclinedMsg {
    resp: 'declined';
    value: {
        data: any; // data that was sent in wx.network
        error?: any;
    };
}

export type TMsg = ITxSuccessMsg | ITxDeclinedMsg | any;

export type TSendSocketData = string | ArrayBufferLike | Blob | ArrayBufferView;

export interface ICreateConnectionParams {
    onOpen?: () => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (error: Event) => void;
    onCreate?: (data: ICreateMsg) => void;
    onMsg?: (data: TMsg) => void;
}
