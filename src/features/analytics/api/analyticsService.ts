import { analyticsDtoSchema, type AnalyticsDto } from '@/features/analytics/schemas/analytics';
import type { Response } from '@/shared/api/http';
import RequestManager from '@/shared/api/requestManager';

class AnalyticsService extends RequestManager {
    protected readonly basePath = '/analytics';

    public async get(): Promise<Response<AnalyticsDto>> {
        return this.request('', analyticsDtoSchema);
    }
}

export const analyticsService = new AnalyticsService();
