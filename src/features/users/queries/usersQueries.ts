import { queryOptions } from '@tanstack/react-query';
import { usersService } from '@/features/users/api/usersService';
import { resources } from '@/shared/api/resources';
import { buildKey } from '@/shared/queries/buildKey';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const usersQueries = {
    all: () =>
        queryOptions({
            queryKey: buildKey(resources.users.key, 'all'),
            queryFn: () => unwrap(usersService.getAll()),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: buildKey(resources.users.key, id),
            queryFn: () => unwrap(usersService.getById(id)),
        }),
    active: () =>
        queryOptions({
            queryKey: buildKey(resources.users.key, 'active'),
            queryFn: () => unwrap(usersService.getActive()),
        }),
    byDepartment: (departmentId: number) =>
        queryOptions({
            queryKey: buildKey(resources.users.key, 'department', departmentId),
            queryFn: () => unwrap(usersService.getByDepartment(departmentId)),
        }),
};
