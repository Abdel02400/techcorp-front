import { CardContent } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const LEGEND_ROW_COUNT = 3;

export const StatusDistributionChartSkeleton = () => (
    <CardContent className="flex flex-col items-center gap-4">
        <Skeleton className="mx-auto aspect-square w-full max-w-64 rounded-full" />
        <div className="grid w-full grid-cols-3 gap-2">
            {Array.from({ length: LEGEND_ROW_COUNT }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
            ))}
        </div>
    </CardContent>
);
