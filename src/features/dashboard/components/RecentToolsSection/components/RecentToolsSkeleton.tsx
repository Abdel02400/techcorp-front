import { Skeleton } from '@/shared/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';

const SKELETON_ROW_COUNT = 10;

export const RecentToolsSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tool</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Users</TableHead>
                    <TableHead className="text-right">Monthly Cost</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-6 rounded" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="ml-auto h-4 w-10" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="ml-auto h-4 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
