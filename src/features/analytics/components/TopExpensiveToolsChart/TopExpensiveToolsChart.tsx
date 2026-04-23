import { TopExpensiveToolsChartContent } from '@/features/analytics/components/TopExpensiveToolsChart/components/TopExpensiveToolsChartContent';
import { TopExpensiveToolsChartHeader } from '@/features/analytics/components/TopExpensiveToolsChart/components/TopExpensiveToolsChartHeader';
import { TopExpensiveToolsChartSkeleton } from '@/features/analytics/components/TopExpensiveToolsChart/components/TopExpensiveToolsChartSkeleton';
import { BlockCard } from '@/shared/components/BlockCard';

export const TopExpensiveToolsChart = () => (
    <BlockCard header={<TopExpensiveToolsChartHeader />} skeleton={<TopExpensiveToolsChartSkeleton />}>
        <TopExpensiveToolsChartContent />
    </BlockCard>
);
