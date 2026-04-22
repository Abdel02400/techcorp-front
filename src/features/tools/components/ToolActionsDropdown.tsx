'use client';

import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import type { ToolDto } from '@/features/tools/schemas/tool';
import { DeleteToolDialog } from '@/features/tools/components/DeleteToolDialog';
import { ToolFormDialog } from '@/features/tools/components/ToolFormDialog';
import { Button } from '@/shared/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { useToggleToolStatus } from '@/features/tools/hooks/useToolMutations';

interface ToolActionsDropdownProps {
    tool: ToolDto;
}

export const ToolActionsDropdown = ({ tool }: ToolActionsDropdownProps) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const toggleStatus = useToggleToolStatus();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${tool.name}`} />}>
                    <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setEditOpen(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleStatus.mutate(tool)} disabled={toggleStatus.isPending}>
                        {tool.status === 'active' ? 'Disable' : 'Enable'}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => setDeleteOpen(true)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <ToolFormDialog open={editOpen} onOpenChange={setEditOpen} mode="edit" tool={tool} />
            <DeleteToolDialog open={deleteOpen} onOpenChange={setDeleteOpen} tool={tool} />
        </>
    );
};
