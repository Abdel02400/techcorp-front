import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

const PieCardSkeleton = () => {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-5 w-48" />
                <Skeleton className="mt-2 h-3.5 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <Skeleton className="size-56 rounded-full" />
                <div className="grid w-full grid-cols-2 gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </CardContent>
        </Card>
    );
};

export const AnalyticsSkeleton = () => {
    return (
        <div className="flex flex-col gap-6">
            <Card className="p-2">
                <CardHeader>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="mt-2 h-3.5 w-80" />
                </CardHeader>
                <CardContent className="flex flex-col gap-5">
                    <Skeleton className="h-10 w-60" />
                    <Skeleton className="h-2 w-full rounded-full" />
                </CardContent>
            </Card>
            <div className="grid gap-6 md:grid-cols-2">
                <PieCardSkeleton />
                <PieCardSkeleton />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-56" />
                    <Skeleton className="mt-2 h-3.5 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-80 w-full" />
                </CardContent>
            </Card>
        </div>
    );
};
