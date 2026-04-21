import { queryOptions } from '@tanstack/react-query';
import { toolsService } from '@/api/services/toolsService';
import { unwrapResponse } from '@/queries/unwrapResponse';
import type { ToolStatus } from '@/validators/enums';

export const toolsQueries = {
    all: () =>
        queryOptions({
            queryKey: ['tools', 'all'] as const,
            queryFn: async () => unwrapResponse(await toolsService.getAll()),
        }),
    recent: (limit = 8) =>
        queryOptions({
            queryKey: ['tools', 'recent', limit] as const,
            queryFn: async () => unwrapResponse(await toolsService.getRecent(limit)),
        }),
    byStatus: (status: ToolStatus) =>
        queryOptions({
            queryKey: ['tools', 'status', status] as const,
            queryFn: async () => unwrapResponse(await toolsService.getByStatus(status)),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['tools', id] as const,
            queryFn: async () => unwrapResponse(await toolsService.getById(id)),
        }),
};
