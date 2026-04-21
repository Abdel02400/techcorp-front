import { z } from 'zod';
import { departmentDtoSchema, type DepartmentDto } from '@/api/dto/departmentDto';
import type { Response } from '@/api/http';
import RequestManager from '@/api/requestManager';

const departmentListSchema = z.array(departmentDtoSchema);

class DepartmentsService extends RequestManager {
    protected readonly basePath = '/departments';

    public async getAll(): Promise<Response<DepartmentDto[]>> {
        return this.request('', departmentListSchema);
    }

    public async getById(id: number): Promise<Response<DepartmentDto>> {
        return this.request(`/${id}`, departmentDtoSchema);
    }
}

export const departmentsService = new DepartmentsService();
