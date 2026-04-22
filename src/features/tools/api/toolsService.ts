import { z } from 'zod';
import { toolDtoSchema, toolListSchema, type ToolDto, type ToolInput } from '@/features/tools/schemas/tool';
import { ResponseStatus, type Response } from '@/shared/api/http';
import RequestManager from '@/shared/api/requestManager';
import type { ToolStatus } from '@/features/tools/schemas/enums';

class ToolsService extends RequestManager {
    protected readonly basePath = '/tools';

    public async getAll(): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema);
    }

    public async getRecent(limit = 8): Promise<Response<ToolDto[]>> {
        const response = await this.request('', toolListSchema, { params: { _sort: 'updated_at', _order: 'desc', _limit: limit * 4 } });
        if (response.status === ResponseStatus.Ko) return response;
        return { status: ResponseStatus.Ok, data: response.data.slice(0, limit) };
    }

    public async getByStatus(status: ToolStatus): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema, { params: { status } });
    }

    public async getById(id: number): Promise<Response<ToolDto>> {
        return this.request(`/${id}`, toolDtoSchema);
    }

    public async create(input: ToolInput): Promise<Response<ToolDto>> {
        return this.request('', toolDtoSchema, {
            method: 'POST',
            body: JSON.stringify(input),
        });
    }

    public async update(id: number, input: Partial<ToolInput>): Promise<Response<ToolDto>> {
        return this.request(`/${id}`, toolDtoSchema, {
            method: 'PATCH',
            body: JSON.stringify(input),
        });
    }

    public async remove(id: number): Promise<Response<unknown>> {
        return this.request(`/${id}`, z.unknown(), { method: 'DELETE' });
    }
}

export const toolsService = new ToolsService();
