import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { KpisSection } from '@/features/dashboard/components/KpisSection';
import { KpisSkeleton } from '@/features/dashboard/components/KpisSkeleton';
import { RecentToolsSection } from '@/features/dashboard/components/RecentToolsSection';
import { BRAND } from '@/config/brand';
import { getServerQueryClient } from '@/shared/lib/queryClient';
import { analyticsQueries } from '@/features/analytics/queries/analyticsQueries';
import { departmentsQueries } from '@/features/departments/queries/departmentsQueries';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';

const DashboardPage = () => {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(analyticsQueries.get());
    void queryClient.prefetchQuery(toolsQueries.all());
    void queryClient.prefetchQuery(toolsQueries.recent(8));
    void queryClient.prefetchQuery(departmentsQueries.all());

    return (
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 md:px-6">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{BRAND.productName} Dashboard</h1>
                <p className="text-muted-foreground">{BRAND.tagline}</p>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="flex flex-col gap-6">
                    <Suspense fallback={<KpisSkeleton />}>
                        <KpisSection />
                    </Suspense>
                    <RecentToolsSection />
                </div>
            </HydrationBoundary>
        </main>
    );
};

export default DashboardPage;
