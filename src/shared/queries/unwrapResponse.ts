import { ResponseStatus, type Response } from '@/shared/api/http';

const DEFAULT_API_ERROR_MESSAGE = 'API request failed' as const;

export const unwrapResponse = <T>(response: Response<T>): T => {
    if (response.status === ResponseStatus.Ko) throw new Error(response.message ?? DEFAULT_API_ERROR_MESSAGE);
    return response.data;
};

export const unwrap = <T>(promise: Promise<Response<T>>): Promise<T> => promise.then(unwrapResponse);
