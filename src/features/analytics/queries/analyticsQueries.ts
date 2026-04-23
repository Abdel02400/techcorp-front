import { queryOptions } from '@tanstack/react-query';
import { analyticsService } from '@/features/analytics/api/analyticsService';
import { resources } from '@/shared/api/resources';
import { buildKey } from '@/shared/queries/buildKey';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const analyticsQueries = {
    get: () =>
        queryOptions({
            queryKey: buildKey(resources.analytics.key),
            queryFn: () => unwrap(analyticsService.get()),
        }),
};
