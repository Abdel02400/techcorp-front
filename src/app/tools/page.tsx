import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AddToolButton } from '@/features/tools/components/AddToolButton';
import { ToolsFilters } from '@/features/tools/components/ToolsFilters/ToolsFilters';
import { ToolsTable } from '@/features/tools/components/ToolsTable/ToolsTable';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import { Heading, Text } from '@/shared/components/typography';
import { Card } from '@/shared/components/ui/card';
import { getServerQueryClient } from '@/shared/lib/queryClient';

const ToolsPage = () => {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(toolsQueries.all());

    return (
        <main className="mx-auto w-full max-w-app flex-1 px-4 py-8 pb-24 md:px-6 lg:pb-8">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-2">
                    <Heading level="page" as="h1">
                        Tools Catalogue
                    </Heading>
                    <Text variant="muted">Browse, filter and manage every SaaS tool used across the organization.</Text>
                </div>
                <AddToolButton />
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Card className="overflow-hidden py-0">
                    <div className="border-b border-border/60 px-6 py-4">
                        <ToolsFilters />
                    </div>
                    <div className="px-6 py-4">
                        <ToolsTable />
                    </div>
                </Card>
            </HydrationBoundary>
        </main>
    );
};

export default ToolsPage;
