import { ResponseStatus, type Response } from '@/api/http';

export const unwrapResponse = <T>(response: Response<T>): T => {
    if (response.status === ResponseStatus.Ko) throw new Error(response.message ?? 'API request failed');
    return response.data;
};
