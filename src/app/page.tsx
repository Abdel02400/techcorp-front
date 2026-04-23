import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { BRAND } from '@/config/brand';
import { analyticsQueries } from '@/features/analytics/queries/analyticsQueries';
import { departmentsQueries } from '@/features/departments/queries/departmentsQueries';
import { KpisSection } from '@/features/dashboard/components/KpisSection/KpisSection';
import { RecentToolsSection } from '@/features/dashboard/components/RecentToolsSection/RecentToolsSection';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import { Heading, Text } from '@/shared/components/typography';
import { getServerQueryClient } from '@/shared/lib/queryClient';

const DashboardPage = () => {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(analyticsQueries.get());
    void queryClient.prefetchQuery(toolsQueries.all());
    void queryClient.prefetchQuery(departmentsQueries.all());

    return (
        <main className="mx-auto w-full max-w-app flex-1 px-4 py-8 pb-24 md:px-6 lg:pb-8">
            <div className="mb-8 flex flex-col gap-2">
                <Heading level="page" as="h1">
                    {BRAND.productName} Dashboard
                </Heading>
                <Text variant="muted">{BRAND.tagline}</Text>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="flex flex-col gap-6">
                    <KpisSection />
                    <RecentToolsSection />
                </div>
            </HydrationBoundary>
        </main>
    );
};

export default DashboardPage;
