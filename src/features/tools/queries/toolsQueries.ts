import { queryOptions } from '@tanstack/react-query';
import { toolsService } from '@/features/tools/api/toolsService';
import { unwrap } from '@/shared/queries/unwrapResponse';
import type { ToolStatus } from '@/features/tools/schemas/enums';

export const toolsQueries = {
    all: () =>
        queryOptions({
            queryKey: ['tools', 'all'] as const,
            queryFn: () => unwrap(toolsService.getAll()),
        }),
    recent: (limit = 8) =>
        queryOptions({
            queryKey: ['tools', 'recent', limit] as const,
            queryFn: () => unwrap(toolsService.getRecent(limit)),
        }),
    byStatus: (status: ToolStatus) =>
        queryOptions({
            queryKey: ['tools', 'status', status] as const,
            queryFn: () => unwrap(toolsService.getByStatus(status)),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: ['tools', id] as const,
            queryFn: () => unwrap(toolsService.getById(id)),
        }),
};
