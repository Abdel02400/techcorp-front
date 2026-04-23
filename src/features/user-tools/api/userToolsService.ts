import { z } from 'zod';
import { userToolDtoSchema, type UserToolDto } from '@/features/user-tools/schemas/userTool';
import type { Response } from '@/shared/api/http';
import RequestManager from '@/shared/api/requestManager';
import { resources } from '@/shared/api/resources';

const userToolListSchema = z.array(userToolDtoSchema);

class UserToolsService extends RequestManager {
    protected readonly basePath = resources.userTools.endpoint;

    public async getAll(): Promise<Response<UserToolDto[]>> {
        return this.request('', userToolListSchema);
    }

    public async getByUserId(userId: number): Promise<Response<UserToolDto[]>> {
        return this.request('', userToolListSchema, { params: { user_id: userId } });
    }

    public async getByToolId(toolId: number): Promise<Response<UserToolDto[]>> {
        return this.request('', userToolListSchema, { params: { tool_id: toolId } });
    }
}

export const userToolsService = new UserToolsService();
