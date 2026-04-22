'use client';

import type { ToolDto } from '@/features/tools/schemas/tool';
import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { useDeleteTool } from '@/features/tools/hooks/useToolMutations';

interface DeleteToolDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    tool: Pick<ToolDto, 'id' | 'name'>;
}

export const DeleteToolDialog = ({ open, onOpenChange, tool }: DeleteToolDialogProps) => {
    const deleteMutation = useDeleteTool();

    const handleDelete = async () => {
        await deleteMutation.mutateAsync(tool);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {tool.name}?</DialogTitle>
                    <DialogDescription>This action cannot be undone. The tool will be removed from the catalogue.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={deleteMutation.isPending}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
                        {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
