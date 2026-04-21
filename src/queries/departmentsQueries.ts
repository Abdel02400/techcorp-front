import { queryOptions } from '@tanstack/react-query';
import { departmentsService } from '@/api/services/departmentsService';
import { unwrapResponse } from '@/queries/unwrapResponse';

export const departmentsQueries = {
    all: () =>
        queryOptions({
            queryKey: ['departments', 'all'] as const,
            queryFn: async () => unwrapResponse(await departmentsService.getAll()),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['departments', id] as const,
            queryFn: async () => unwrapResponse(await departmentsService.getById(id)),
        }),
};
