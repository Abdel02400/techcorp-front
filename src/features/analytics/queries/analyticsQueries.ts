import { queryOptions } from '@tanstack/react-query';
import { analyticsService } from '@/features/analytics/api/analyticsService';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const analyticsQueries = {
    get: () =>
        queryOptions({
            queryKey: ['analytics'] as const,
            queryFn: () => unwrap(analyticsService.get()),
        }),
};
