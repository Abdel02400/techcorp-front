import { queryOptions } from '@tanstack/react-query';
import { departmentsService } from '@/features/departments/api/departmentsService';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const departmentsQueries = {
    all: () =>
        queryOptions({
            queryKey: ['departments', 'all'] as const,
            queryFn: () => unwrap(departmentsService.getAll()),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['departments', id] as const,
            queryFn: () => unwrap(departmentsService.getById(id)),
        }),
};
