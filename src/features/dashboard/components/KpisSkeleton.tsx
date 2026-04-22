import { Card } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const KpiCardSkeleton = () => {
    return (
        <Card className="p-6">
            <div className="flex items-start justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-8 rounded-lg" />
            </div>
            <Skeleton className="mt-6 h-9 w-32" />
            <Skeleton className="mt-3 h-5 w-14 rounded-full" />
        </Card>
    );
};

export const KpisSkeleton = () => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
            <KpiCardSkeleton />
        </div>
    );
};
