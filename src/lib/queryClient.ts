import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

export const QUERY_STALE_TIME_MS = 60 * 1000;

export const createServerQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: QUERY_STALE_TIME_MS,
            },
        },
    });
};

export const createClientQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: QUERY_STALE_TIME_MS,
                refetchOnWindowFocus: false,
            },
        },
    });
};

export const getServerQueryClient = cache(() => createServerQueryClient());
