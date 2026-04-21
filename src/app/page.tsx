import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { KpisSection } from '@/components/dashboard/KpisSection';
import { KpisSkeleton } from '@/components/dashboard/KpisSkeleton';
import { BRAND } from '@/lib/brand';
import { getServerQueryClient } from '@/lib/queryClient';
import { analyticsQueries } from '@/queries/analyticsQueries';
import { departmentsQueries } from '@/queries/departmentsQueries';
import { toolsQueries } from '@/queries/toolsQueries';

const DashboardPage = () => {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(analyticsQueries.get());
    void queryClient.prefetchQuery(toolsQueries.all());
    void queryClient.prefetchQuery(departmentsQueries.all());

    return (
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 md:px-6">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{BRAND.productName} Dashboard</h1>
                <p className="text-muted-foreground">{BRAND.tagline}</p>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<KpisSkeleton />}>
                    <KpisSection />
                </Suspense>
            </HydrationBoundary>
        </main>
    );
};

export default DashboardPage;
