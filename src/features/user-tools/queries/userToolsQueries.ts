import { queryOptions } from '@tanstack/react-query';
import { userToolsService } from '@/features/user-tools/api/userToolsService';
import { unwrap } from '@/shared/queries/unwrapResponse';

export const userToolsQueries = {
    all: () =>
        queryOptions({
            queryKey: ['user_tools', 'all'] as const,
            queryFn: () => unwrap(userToolsService.getAll()),
        }),
    byUserId: (userId: number) =>
        queryOptions({
            queryKey: ['user_tools', 'user', userId] as const,
            queryFn: () => unwrap(userToolsService.getByUserId(userId)),
        }),
    byToolId: (toolId: number) =>
        queryOptions({
            queryKey: ['user_tools', 'tool', toolId] as const,
            queryFn: () => unwrap(userToolsService.getByToolId(toolId)),
        }),
};
