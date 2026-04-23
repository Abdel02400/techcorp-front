import { z } from 'zod';
import { departmentDtoSchema, type DepartmentDto } from '@/features/departments/schemas/department';
import type { Response } from '@/shared/api/http';
import RequestManager from '@/shared/api/requestManager';
import { resources } from '@/shared/api/resources';

const departmentListSchema = z.array(departmentDtoSchema);

class DepartmentsService extends RequestManager {
    protected readonly basePath = resources.departments.endpoint;

    public async getAll(): Promise<Response<DepartmentDto[]>> {
        return this.request('', departmentListSchema);
    }

    public async getById(id: number): Promise<Response<DepartmentDto>> {
        return this.request(`/${id}`, departmentDtoSchema);
    }
}

export const departmentsService = new DepartmentsService();
