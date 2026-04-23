import { queryOptions } from '@tanstack/react-query';
import { userToolsService } from '@/features/user-tools/api/userToolsService';
import { resources } from '@/shared/api/resources';
import { buildKey } from '@/shared/queries/buildKey';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const userToolsQueries = {
    all: () =>
        queryOptions({
            queryKey: buildKey(resources.userTools.key, 'all'),
            queryFn: () => unwrap(userToolsService.getAll()),
        }),
    byUserId: (userId: number) =>
        queryOptions({
            queryKey: buildKey(resources.userTools.key, 'user', userId),
            queryFn: () => unwrap(userToolsService.getByUserId(userId)),
        }),
    byToolId: (toolId: number) =>
        queryOptions({
            queryKey: buildKey(resources.userTools.key, 'tool', toolId),
            queryFn: () => unwrap(userToolsService.getByToolId(toolId)),
        }),
};
