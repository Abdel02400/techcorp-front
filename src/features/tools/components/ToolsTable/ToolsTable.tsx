import { ToolsTableContent } from '@/features/tools/components/ToolsTable/components/ToolsTableContent';
import { ToolsTableSkeleton } from '@/features/tools/components/ToolsTable/components/ToolsTableSkeleton';
import { Block } from '@/shared/components/Block';

export const ToolsTable = () => (
    <Block skeleton={<ToolsTableSkeleton />}>
        <ToolsTableContent />
    </Block>
);
