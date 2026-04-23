import { BudgetOverviewContent } from '@/features/analytics/components/BudgetOverviewCard/components/BudgetOverviewContent';
import { BudgetOverviewHeader } from '@/features/analytics/components/BudgetOverviewCard/components/BudgetOverviewHeader';
import { BudgetOverviewSkeleton } from '@/features/analytics/components/BudgetOverviewCard/components/BudgetOverviewSkeleton';
import { BlockCard } from '@/shared/components/BlockCard';

export const BudgetOverviewCard = () => (
    <BlockCard header={<BudgetOverviewHeader />} skeleton={<BudgetOverviewSkeleton />}>
        <BudgetOverviewContent />
    </BlockCard>
);
