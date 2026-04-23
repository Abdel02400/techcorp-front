import { queryOptions } from '@tanstack/react-query';
import { toolsService } from '@/features/tools/api/toolsService';
import type { ToolStatus } from '@/features/tools/schemas/enums';
import { resources } from '@/shared/api/resources';
import { buildKey } from '@/shared/queries/buildKey';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const toolsQueries = {
    all: () =>
        queryOptions({
            queryKey: buildKey(resources.tools.key, 'all'),
            queryFn: () => unwrap(toolsService.getAll()),
        }),
    recent: (limit = 8) =>
        queryOptions({
            queryKey: buildKey(resources.tools.key, 'recent', limit),
            queryFn: () => unwrap(toolsService.getRecent(limit)),
        }),
    byStatus: (status: ToolStatus) =>
        queryOptions({
            queryKey: buildKey(resources.tools.key, 'status', status),
            queryFn: () => unwrap(toolsService.getByStatus(status)),
        }),
    byId: (id: number) =>
        queryOptions({
            queryKey: buildKey(resources.tools.key, id),
            queryFn: () => unwrap(toolsService.getById(id)),
        }),
};
