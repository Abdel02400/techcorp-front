'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import type { ToolStatus } from '@/features/tools/schemas/enums';
import { CardContent } from '@/shared/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/components/ui/chart';
import { path } from '@/shared/router';

const STATUS_CONFIG: Record<ToolStatus, { label: string; fill: string }> = {
    active: { label: 'Active', fill: 'oklch(0.72 0.19 150)' },
    expiring: { label: 'Expiring', fill: 'oklch(0.7 0.2 40)' },
    unused: { label: 'Unused', fill: 'oklch(0.68 0.25 10)' },
};

const STATUSES: ToolStatus[] = ['active', 'expiring', 'unused'];

export const StatusDistributionChartContent = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const router = useRouter();

    const handleSliceClick = useCallback((status: ToolStatus) => router.push(path('tools', { status })), [router]);

    const chartData = useMemo(() => {
        const counts: Record<ToolStatus, number> = { active: 0, expiring: 0, unused: 0 };
        for (const tool of tools) counts[tool.status] += 1;
        return STATUSES.map((status) => ({ name: STATUS_CONFIG[status].label, status, value: counts[status], fill: STATUS_CONFIG[status].fill }));
    }, [tools]);

    const chartConfig = useMemo<ChartConfig>(() => Object.fromEntries(STATUSES.map((status) => [STATUS_CONFIG[status].label, { label: STATUS_CONFIG[status].label, color: STATUS_CONFIG[status].fill }])), []);

    return (
        <CardContent className="flex flex-col gap-4">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={95}
                        strokeWidth={2}
                        onClick={(slice) => handleSliceClick((slice as unknown as (typeof chartData)[number]).status)}
                        className="cursor-pointer outline-none focus:outline-none"
                    >
                        {chartData.map((slice) => (
                            <Cell key={slice.status} fill={slice.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
            <ul className="grid gap-1.5 text-sm sm:grid-cols-3">
                {chartData.map((slice) => (
                    <li key={slice.status}>
                        <button type="button" onClick={() => handleSliceClick(slice.status)} className="flex w-full items-center gap-2 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-muted">
                            <span className="size-2.5 shrink-0 rounded-full" style={{ background: slice.fill }} />
                            <span className="truncate">{slice.name}</span>
                            <span className="ml-auto shrink-0 font-medium tabular-nums">{slice.value}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </CardContent>
    );
};
