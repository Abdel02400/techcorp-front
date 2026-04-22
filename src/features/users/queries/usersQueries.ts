import { queryOptions } from '@tanstack/react-query';
import { usersService } from '@/features/users/api/usersService';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const usersQueries = {
    all: () =>
        queryOptions({
            queryKey: ['users', 'all'] as const,
            queryFn: () => unwrap(usersService.getAll()),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['users', id] as const,
            queryFn: () => unwrap(usersService.getById(id)),
        }),
    active: () =>
        queryOptions({
            queryKey: ['users', 'active'] as const,
            queryFn: () => unwrap(usersService.getActive()),
        }),
    byDepartment: (departmentId: number) =>
        queryOptions({
            queryKey: ['users', 'department', departmentId] as const,
            queryFn: () => unwrap(usersService.getByDepartment(departmentId)),
        }),
};
