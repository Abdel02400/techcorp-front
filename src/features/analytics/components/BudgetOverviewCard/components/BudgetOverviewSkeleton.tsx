import { CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export const BudgetOverviewSkeleton = () => (
    <CardContent className="flex flex-col gap-5">
        <Skeleton className="h-10 w-60" />
        <Skeleton className="h-2 w-full rounded-full" />
    </CardContent>
);
