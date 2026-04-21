import { Skeleton } from '@/components/ui/skeleton';

export const ToolsFiltersSkeleton = () => {
    return (
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Skeleton className="h-9 w-44" />
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-44" />
            <div className="flex items-center gap-1.5">
                <Skeleton className="h-9 w-24" />
                <span className="text-muted-foreground">–</span>
                <Skeleton className="h-9 w-24" />
            </div>
        </div>
    );
};
