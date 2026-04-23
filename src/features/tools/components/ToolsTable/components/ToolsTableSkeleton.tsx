import { Skeleton } from '@/shared/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';

const SKELETON_ROW_COUNT = 10;

export const ToolsTableSkeleton = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tool</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">Users</TableHead>
                    <TableHead className="text-right">Monthly Cost</TableHead>
                    <TableHead>Last updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10" aria-label="Actions" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: SKELETON_ROW_COUNT }).map((_, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Skeleton className="size-6 rounded" />
                                <div className="flex flex-col gap-1">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="ml-auto h-4 w-10" />
                        </TableCell>
                        <TableCell className="text-right">
                            <Skeleton className="ml-auto h-4 w-16" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="size-8 rounded" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
