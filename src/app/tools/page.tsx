import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { AddToolButton } from '@/components/tools/AddToolButton';
import { ToolsFilters } from '@/components/tools/ToolsFilters';
import { ToolsFiltersSkeleton } from '@/components/tools/ToolsFiltersSkeleton';
import { ToolsSkeleton } from '@/components/tools/ToolsSkeleton';
import { ToolsTable } from '@/components/tools/ToolsTable';
import { Card } from '@/components/ui/card';
import { getServerQueryClient } from '@/lib/queryClient';
import { toolsQueries } from '@/queries/toolsQueries';

const ToolsPage = () => {
    const queryClient = getServerQueryClient();
    void queryClient.prefetchQuery(toolsQueries.all());

    return (
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 md:px-6">
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Tools Catalogue</h1>
                    <p className="text-muted-foreground">Browse, filter and manage every SaaS tool used across the organization.</p>
                </div>
                <AddToolButton />
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Card className="overflow-hidden py-0">
                    <div className="border-b border-border/60 px-6 py-4">
                        <Suspense fallback={<ToolsFiltersSkeleton />}>
                            <ToolsFilters />
                        </Suspense>
                    </div>
                    <div className="px-6 py-4">
                        <Suspense fallback={<ToolsSkeleton />}>
                            <ToolsTable />
                        </Suspense>
                    </div>
                </Card>
            </HydrationBoundary>
        </main>
    );
};

export default ToolsPage;
