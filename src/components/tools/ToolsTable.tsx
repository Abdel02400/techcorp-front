'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ToolIcon } from '@/components/common/ToolIcon';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatRelativeTime } from '@/lib/format';
import { toolsQueries } from '@/queries/toolsQueries';

export const ToolsTable = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const searchParams = useSearchParams();
    const search = searchParams.get('search')?.trim().toLowerCase() ?? '';

    const filteredTools = useMemo(() => {
        if (!search) return tools;
        return tools.filter((tool) => tool.name.toLowerCase().includes(search) || (tool.description?.toLowerCase().includes(search) ?? false) || (tool.vendor?.toLowerCase().includes(search) ?? false));
    }, [tools, search]);

    if (filteredTools.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <p className="text-sm font-medium">No tools match your search.</p>
                <p className="text-sm text-muted-foreground">Try a different keyword or clear the search.</p>
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
                            <DropdownMenu>
                                <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-8" aria-label={`Actions for ${tool.name}`} />}>
                                    <MoreHorizontal className="size-4" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem disabled>View details</DropdownMenuItem>
                                    <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                                    <DropdownMenuItem disabled>{tool.status === 'active' ? 'Disable' : 'Enable'}</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem disabled variant="destructive">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
