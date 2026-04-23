import { queryOptions } from '@tanstack/react-query';
import { departmentsService } from '@/features/departments/api/departmentsService';
import { resources } from '@/shared/api/resources';
import { buildKey } from '@/shared/queries/buildKey';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const departmentsQueries = {
    all: () =>
        queryOptions({
            queryKey: buildKey(resources.departments.key, 'all'),
            queryFn: () => unwrap(departmentsService.getAll()),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: buildKey(resources.departments.key, id),
            queryFn: () => unwrap(departmentsService.getById(id)),
        }),
};
