import { z } from 'zod';
import { userDtoSchema, type UserDto } from '@/features/users/schemas/user';
import type { Response } from '@/shared/api/http';
import RequestManager from '@/shared/api/requestManager';
import { resources } from '@/shared/api/resources';

const userListSchema = z.array(userDtoSchema);

class UsersService extends RequestManager {
    protected readonly basePath = resources.users.endpoint;

    public async getAll(): Promise<Response<UserDto[]>> {
        return this.request('', userListSchema);
    }

    public async getById(id: number): Promise<Response<UserDto>> {
        return this.request(`/${id}`, userDtoSchema);
    }

    public async getActive(): Promise<Response<UserDto[]>> {
        return this.request('', userListSchema, { params: { active: true } });
    }

    public async getByDepartment(departmentId: number): Promise<Response<UserDto[]>> {
        return this.request('', userListSchema, { params: { department_id: departmentId } });
    }
}

export const usersService = new UsersService();
