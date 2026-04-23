import { DepartmentCostChartContent } from '@/features/analytics/components/DepartmentCostChart/components/DepartmentCostChartContent';
import { DepartmentCostChartHeader } from '@/features/analytics/components/DepartmentCostChart/components/DepartmentCostChartHeader';
import { DepartmentCostChartSkeleton } from '@/features/analytics/components/DepartmentCostChart/components/DepartmentCostChartSkeleton';
import { BlockCard } from '@/shared/components/BlockCard';

export const DepartmentCostChart = () => (
    <BlockCard header={<DepartmentCostChartHeader />} skeleton={<DepartmentCostChartSkeleton />}>
        <DepartmentCostChartContent />
    </BlockCard>
);
