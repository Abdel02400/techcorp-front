import { StatusDistributionChartContent } from '@/features/analytics/components/StatusDistributionChart/components/StatusDistributionChartContent';
import { StatusDistributionChartHeader } from '@/features/analytics/components/StatusDistributionChart/components/StatusDistributionChartHeader';
import { StatusDistributionChartSkeleton } from '@/features/analytics/components/StatusDistributionChart/components/StatusDistributionChartSkeleton';
import { BlockCard } from '@/shared/components/BlockCard';

export const StatusDistributionChart = () => (
    <BlockCard header={<StatusDistributionChartHeader />} skeleton={<StatusDistributionChartSkeleton />}>
        <StatusDistributionChartContent />
    </BlockCard>
);
