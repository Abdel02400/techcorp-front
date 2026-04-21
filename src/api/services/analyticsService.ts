import { analyticsDtoSchema, type AnalyticsDto } from '@/api/dto/analyticsDto';
import type { Response } from '@/api/http';
import RequestManager from '@/api/requestManager';

class AnalyticsService extends RequestManager {
    protected readonly basePath = '/analytics';

    public async get(): Promise<Response<AnalyticsDto>> {
        return this.request('', analyticsDtoSchema);
    }
}

export const analyticsService = new AnalyticsService();
