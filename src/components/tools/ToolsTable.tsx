'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ToolIcon } from '@/components/common/ToolIcon';
import { ToolActionsDropdown } from '@/components/tools/ToolActionsDropdown';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatRelativeTime } from '@/lib/format';
import { toolsQueries } from '@/queries/toolsQueries';

const matchesSearch = (search: string, ...fields: (string | undefined)[]): boolean => {
    return fields.some((field) => field?.toLowerCase().includes(search) ?? false);
};

export const ToolsTable = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const searchParams = useSearchParams();

    const filteredTools = useMemo(() => {
        const search = searchParams.get('search')?.trim().toLowerCase() ?? '';
        const department = searchParams.get('department');
        const status = searchParams.get('status');
        const category = searchParams.get('category');
        const minCostRaw = searchParams.get('min_cost');
        const maxCostRaw = searchParams.get('max_cost');
        const minCost = minCostRaw ? Number(minCostRaw) : undefined;
        const maxCost = maxCostRaw ? Number(maxCostRaw) : undefined;

        return tools.filter((tool) => {
            if (search && !matchesSearch(search, tool.name, tool.description, tool.vendor)) return false;
            if (department && tool.owner_department !== department) return false;
            if (status && tool.status !== status) return false;
            if (category && tool.category !== category) return false;
            if (minCost !== undefined && tool.monthly_cost < minCost) return false;
            if (maxCost !== undefined && tool.monthly_cost > maxCost) return false;
            return true;
        });
    }, [tools, searchParams]);

    if (filteredTools.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <p className="text-sm font-medium">No tools match your filters.</p>
                <p className="text-sm text-muted-foreground">Try a different keyword or clear the active filters.</p>
            </div>
        );
    }

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
                {filteredTools.map((tool) => (
                    <TableRow key={tool.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <ToolIcon url={tool.icon_url} name={tool.name} />
                                <div className="flex flex-col">
                                    <span className="font-medium">{tool.name}</span>
                                    {tool.description ? <span className="line-clamp-1 text-xs text-muted-foreground">{tool.description}</span> : null}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{tool.category ?? '—'}</TableCell>
                        <TableCell className="text-muted-foreground">{tool.owner_department ?? '—'}</TableCell>
                        <TableCell className="text-right tabular-nums">{tool.active_users_count}</TableCell>
                        <TableCell className="text-right tabular-nums">{formatCurrency(tool.monthly_cost)}</TableCell>
                        <TableCell className="text-muted-foreground">{formatRelativeTime(tool.updated_at)}</TableCell>
                        <TableCell>
                            <StatusBadge status={tool.status} />
                        </TableCell>
                        <TableCell>
                            <ToolActionsDropdown tool={tool} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
