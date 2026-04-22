import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ToolDto, ToolInput } from '@/features/tools/schemas/tool';
import { ResponseStatus } from '@/shared/api/http';
import { toolsService } from '@/features/tools/api/toolsService';
import type { ToolStatus } from '@/features/tools/schemas/enums';

const TOOLS_SCOPE_KEY = ['tools'] as const;

const invalidateTools = (queryClient: ReturnType<typeof useQueryClient>) => queryClient.invalidateQueries({ queryKey: TOOLS_SCOPE_KEY });

export const useCreateTool = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (input: ToolInput) => {
            const response = await toolsService.create(input);
            if (response.status === ResponseStatus.Ko) throw new Error(response.message ?? 'Failed to create tool');
            return response.data;
        },
        onSuccess: async (tool) => {
            toast.success(`"${tool.name}" added to the catalogue`);
            await invalidateTools(queryClient);
        },
        onError: (error) => toast.error(error.message || 'Failed to create tool'),
    });
};

export const useUpdateTool = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, input }: { id: number; input: Partial<ToolInput> }) => {
            const response = await toolsService.update(id, input);
            if (response.status === ResponseStatus.Ko) throw new Error(response.message ?? 'Failed to update tool');
            return response.data;
        },
        onSuccess: async (tool) => {
            toast.success(`"${tool.name}" updated`);
            await invalidateTools(queryClient);
        },
        onError: (error) => toast.error(error.message || 'Failed to update tool'),
    });
};

export const useDeleteTool = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (tool: Pick<ToolDto, 'id' | 'name'>) => {
            const response = await toolsService.remove(tool.id);
            if (response.status === ResponseStatus.Ko) throw new Error(response.message ?? 'Failed to delete tool');
            return tool;
        },
        onSuccess: async (tool) => {
            toast.success(`"${tool.name}" deleted`);
            await invalidateTools(queryClient);
        },
        onError: (error) => toast.error(error.message || 'Failed to delete tool'),
    });
};

export const useToggleToolStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (tool: Pick<ToolDto, 'id' | 'name' | 'status'>) => {
            const nextStatus: ToolStatus = tool.status === 'active' ? 'unused' : 'active';
            const response = await toolsService.update(tool.id, { status: nextStatus });
            if (response.status === ResponseStatus.Ko) throw new Error(response.message ?? 'Failed to update status');
            return { tool: response.data, nextStatus };
        },
        onSuccess: async ({ tool, nextStatus }) => {
            toast.success(`"${tool.name}" is now ${nextStatus}`);
            await invalidateTools(queryClient);
        },
        onError: (error) => toast.error(error.message || 'Failed to update status'),
    });
};
