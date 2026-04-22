import { CalendarDays } from 'lucide-react';
import { Suspense } from 'react';
import { RecentToolsSkeleton } from '@/features/dashboard/components/RecentToolsSkeleton';
import { RecentToolsTable } from '@/features/dashboard/components/RecentToolsTable';
import { Card } from '@/shared/components/ui/card';

export const RecentToolsSection = () => {
    return (
        <Card className="overflow-hidden py-0">
            <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-lg font-semibold">Recent Tools</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="size-4" />
                    <span>Last 30 days</span>
                </div>
            </div>
            <div className="px-6 pb-6">
                <Suspense fallback={<RecentToolsSkeleton />}>
                    <RecentToolsTable />
                </Suspense>
            </div>
        </Card>
    );
};
