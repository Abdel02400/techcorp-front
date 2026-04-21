import { z } from 'zod';
import { toolDtoSchema, type ToolDto } from '@/api/dto/toolDto';
import type { Response } from '@/api/http';
import RequestManager from '@/api/requestManager';
import type { ToolStatus } from '@/validators/enums';

const toolListSchema = z.array(toolDtoSchema);

class ToolsService extends RequestManager {
    protected readonly basePath = '/tools';

    public async getAll(): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema);
    }

    public async getRecent(limit = 8): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema, { params: { _sort: 'updated_at', _order: 'desc', _limit: limit } });
    }

    public async getByStatus(status: ToolStatus): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema, { params: { status } });
    }

    public async getById(id: number): Promise<Response<ToolDto>> {
        return this.request(`/${id}`, toolDtoSchema);
    }
}

export const toolsService = new ToolsService();
