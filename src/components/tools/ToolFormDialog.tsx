'use client';

import type { ToolDto, ToolInput } from '@/api/dto/toolDto';
import { ToolForm } from '@/components/tools/ToolForm';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCreateTool, useUpdateTool } from '@/hooks/useToolMutations';

type ToolFormDialogProps = { open: boolean; onOpenChange: (open: boolean) => void; mode: 'create'; tool?: never } | { open: boolean; onOpenChange: (open: boolean) => void; mode: 'edit'; tool: ToolDto };

const toolToInput = (tool: ToolDto): Partial<ToolInput> => ({
    name: tool.name,
    vendor: tool.vendor ?? '',
    category: tool.category ?? '',
    owner_department: tool.owner_department ?? '',
    status: tool.status,
    monthly_cost: tool.monthly_cost,
    active_users_count: tool.active_users_count,
    website_url: tool.website_url ?? '',
    icon_url: tool.icon_url ?? '',
    description: tool.description ?? '',
});

export const ToolFormDialog = (props: ToolFormDialogProps) => {
    const { open, onOpenChange, mode } = props;
    const createMutation = useCreateTool();
    const updateMutation = useUpdateTool();

    const isSubmitting = mode === 'create' ? createMutation.isPending : updateMutation.isPending;

    const handleSubmit = async (input: ToolInput) => {
        if (mode === 'create') {
            await createMutation.mutateAsync(input);
        } else {
            await updateMutation.mutateAsync({ id: props.tool.id, input });
        }
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Add a new tool' : `Edit ${props.tool.name}`}</DialogTitle>
                    <DialogDescription>{mode === 'create' ? 'Register a new SaaS tool in the catalogue.' : 'Update the tool information. Changes are saved immediately.'}</DialogDescription>
                </DialogHeader>
                <ToolForm defaultValues={mode === 'edit' ? toolToInput(props.tool) : undefined} onSubmit={handleSubmit} submitLabel={mode === 'create' ? 'Add tool' : 'Save changes'} isSubmitting={isSubmitting} />
            </DialogContent>
        </Dialog>
    );
};
