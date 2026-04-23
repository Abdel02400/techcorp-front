import { analyticsDtoSchema, type AnalyticsDto } from '@/features/analytics/schemas/analytics';
import type { Response } from '@/shared/api/http';
import RequestManager from '@/shared/api/requestManager';
import { resources } from '@/shared/api/resources';

class AnalyticsService extends RequestManager {
    protected readonly basePath = resources.analytics.endpoint;

    public async get(): Promise<Response<AnalyticsDto>> {
        return this.request('', analyticsDtoSchema);
    }
}

export const analyticsService = new AnalyticsService();
