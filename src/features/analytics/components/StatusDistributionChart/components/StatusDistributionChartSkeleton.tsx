import { CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const ROW_COUNT = 3;

export const StatusDistributionChartSkeleton = () => (
    <CardContent className="flex flex-col gap-3">
        {Array.from({ length: ROW_COUNT }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
        ))}
    </CardContent>
);
