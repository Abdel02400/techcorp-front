export enum ResponseStatus {
    Ok = 'ok',
    Ko = 'ko',
}

export type OkResponse<T> = { status: ResponseStatus.Ok; data: T };

export type KoResponse = { status: ResponseStatus.Ko; message?: string };

export type Response<T> = OkResponse<T> | KoResponse;
