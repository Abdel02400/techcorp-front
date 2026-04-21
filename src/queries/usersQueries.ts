import { queryOptions } from '@tanstack/react-query';
import { usersService } from '@/api/services/usersService';
import { unwrapResponse } from '@/queries/unwrapResponse';

export const usersQueries = {
    all: () =>
        queryOptions({
            queryKey: ['users', 'all'] as const,
            queryFn: async () => unwrapResponse(await usersService.getAll()),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['users', id] as const,
            queryFn: async () => unwrapResponse(await usersService.getById(id)),
        }),
    active: () =>
        queryOptions({
            queryKey: ['users', 'active'] as const,
            queryFn: async () => unwrapResponse(await usersService.getActive()),
        }),
    byDepartment: (departmentId: number) =>
        queryOptions({
            queryKey: ['users', 'department', departmentId] as const,
            queryFn: async () => unwrapResponse(await usersService.getByDepartment(departmentId)),
        }),
};
