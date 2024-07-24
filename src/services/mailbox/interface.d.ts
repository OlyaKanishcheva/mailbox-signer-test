export interface ICreateMsg {
    resp: 'create';
    id: number;
}

// public key
export interface IPKMsg {
    resp: 'pk';
    value: string;
}

// ecrypted data message
export interface IEncDataMsg {
    resp: 'ecData';
    value: string;
}

// success message
export interface ISuccessMsg {
    resp: 'success';
}

// error message
export interface IErrorMsg {
    resp: 'error';
    value: string;
}

export type TMsg = IPKMsg | IEncDataMsg | ISuccessMsg | IErrorMsg | any;

export type TSendSocketData = string | ArrayBufferLike | Blob | ArrayBufferView;

export interface ICreateConnectionParams {
    onOpen?: () => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (error: Event) => void;
    onCreate?: (data: ICreateMsg) => void;
    onMsg?: (data: TMsg) => void;
}
