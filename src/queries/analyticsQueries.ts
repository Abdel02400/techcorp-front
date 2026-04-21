import { queryOptions } from '@tanstack/react-query';
import { analyticsService } from '@/api/services/analyticsService';
import { unwrapResponse } from '@/queries/unwrapResponse';

export const analyticsQueries = {
    get: () =>
        queryOptions({
            queryKey: ['analytics'] as const,
            queryFn: async () => unwrapResponse(await analyticsService.get()),
        }),
};
