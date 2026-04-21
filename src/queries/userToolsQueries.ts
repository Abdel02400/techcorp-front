import { queryOptions } from '@tanstack/react-query';
import { userToolsService } from '@/api/services/userToolsService';
import { unwrapResponse } from '@/queries/unwrapResponse';

export const userToolsQueries = {
    all: () =>
        queryOptions({
            queryKey: ['user_tools', 'all'] as const,
            queryFn: async () => unwrapResponse(await userToolsService.getAll()),
        }),
    byUserId: (userId: number) =>
        queryOptions({
            queryKey: ['user_tools', 'user', userId] as const,
            queryFn: async () => unwrapResponse(await userToolsService.getByUserId(userId)),
        }),
    byToolId: (toolId: number) =>
        queryOptions({
            queryKey: ['user_tools', 'tool', toolId] as const,
            queryFn: async () => unwrapResponse(await userToolsService.getByToolId(toolId)),
        }),
};
