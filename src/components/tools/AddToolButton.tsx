'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { ToolFormDialog } from '@/components/tools/ToolFormDialog';
import { Button } from '@/components/ui/button';

export const AddToolButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button onClick={() => setOpen(true)} size="lg">
                <Plus className="size-4" />
                Add Tool
            </Button>
            <ToolFormDialog open={open} onOpenChange={setOpen} mode="create" />
        </>
    );
};
