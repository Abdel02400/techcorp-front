'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ToolIcon } from '@/components/common/ToolIcon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/format';
import { toolsQueries } from '@/queries/toolsQueries';

export const RecentToolsTable = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.recent(8));

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
                {tools.map((tool) => (
                    <TableRow key={tool.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <ToolIcon url={tool.icon_url} name={tool.name} />
                                <span className="font-medium">{tool.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{tool.owner_department ?? '—'}</TableCell>
                        <TableCell className="text-right tabular-nums">{tool.active_users_count}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatCurrency(tool.monthly_cost)}</TableCell>
                        <TableCell>
                            <StatusBadge status={tool.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
