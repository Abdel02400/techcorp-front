import { ToolsFiltersContent } from '@/features/tools/components/ToolsFilters/components/ToolsFiltersContent';
import { ToolsFiltersSkeleton } from '@/features/tools/components/ToolsFilters/components/ToolsFiltersSkeleton';
import { Block } from '@/shared/components/Block';

export const ToolsFilters = () => (
    <Block skeleton={<ToolsFiltersSkeleton />}>
        <ToolsFiltersContent />
    </Block>
);
