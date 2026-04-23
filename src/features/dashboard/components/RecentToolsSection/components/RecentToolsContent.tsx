'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { StatusBadge } from '@/features/tools/components/StatusBadge';
import { ToolActionsDropdown } from '@/features/tools/components/ToolActionsDropdown';
import { ToolIcon } from '@/features/tools/components/ToolIcon';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { formatCurrency } from '@/shared/lib/format';

type SortKey = 'name' | 'department' | 'updated_at';
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 10;
const DEFAULT_SORT: { key: SortKey; direction: SortDirection } = { key: 'updated_at', direction: 'desc' };

const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => {
    if (!active) return <ArrowUpDown className="size-3.5 opacity-40" />;
    return direction === 'asc' ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />;
};

export const RecentToolsContent = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const [sort, setSort] = useState(DEFAULT_SORT);
    const [page, setPage] = useState(1);

    const toggleSort = (key: SortKey) => {
        setSort((current) => (current.key !== key ? { key, direction: 'asc' } : { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }));
        setPage(1);
    };

    const sortedTools = useMemo(() => {
        const copy = [...tools];
        copy.sort((a, b) => {
            let comparison = 0;
            if (sort.key === 'name') comparison = a.name.localeCompare(b.name);
            else if (sort.key === 'department') comparison = (a.owner_department ?? '').localeCompare(b.owner_department ?? '');
            else comparison = new Date(a.updated_at ?? 0).getTime() - new Date(b.updated_at ?? 0).getTime();
            return sort.direction === 'asc' ? comparison : -comparison;
        });
        return copy;
    }, [tools, sort]);

    const totalPages = Math.max(1, Math.ceil(sortedTools.length / ITEMS_PER_PAGE));
    const currentPage = Math.min(page, totalPages);

    const paginatedTools = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedTools.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedTools, currentPage]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <button type="button" onClick={() => toggleSort('name')} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                                Tool
                                <SortIcon active={sort.key === 'name'} direction={sort.direction} />
                            </button>
                        </TableHead>
                        <TableHead>
                            <button type="button" onClick={() => toggleSort('department')} className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                                Department
                                <SortIcon active={sort.key === 'department'} direction={sort.direction} />
                            </button>
                        </TableHead>
                        <TableHead className="text-right">Users</TableHead>
                        <TableHead className="text-right">Monthly Cost</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-10" aria-label="Actions" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedTools.map((tool) => (
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
                            <TableCell>
                                <ToolActionsDropdown tool={tool} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
                <span className="tabular-nums">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};
