import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { AnalyticsSkeleton } from '@/features/analytics/components/AnalyticsSkeleton';
import { BudgetOverviewCard } from '@/features/analytics/components/BudgetOverviewCard';
import { DepartmentCostChart } from '@/features/analytics/components/DepartmentCostChart';
import { StatusDistributionChart } from '@/features/analytics/components/StatusDistributionChart';
import { TopExpensiveToolsChart } from '@/features/analytics/components/TopExpensiveToolsChart';
import { getServerQueryClient } from '@/shared/lib/queryClient';
import { analyticsQueries } from '@/features/analytics/queries/analyticsQueries';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';

const AnalyticsPage = () => {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(analyticsQueries.get());
    void queryClient.prefetchQuery(toolsQueries.all());

    return (
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 md:px-6">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Analytics</h1>
                <p className="text-muted-foreground">Cost breakdown and usage insights across the tools catalogue.</p>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AnalyticsSkeleton />}>
                    <div className="flex flex-col gap-6">
                        <BudgetOverviewCard />
                        <div className="grid gap-6 md:grid-cols-2">
                            <DepartmentCostChart />
                            <StatusDistributionChart />
                        </div>
                        <TopExpensiveToolsChart />
                    </div>
                </Suspense>
            </HydrationBoundary>
        </main>
    );
};

export default AnalyticsPage;
