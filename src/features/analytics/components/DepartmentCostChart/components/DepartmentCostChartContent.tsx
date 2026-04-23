'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import { CardContent } from '@/shared/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/components/ui/chart';
import { formatCurrency } from '@/shared/lib/format';
import { path } from '@/shared/router';

const PALETTE = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)', 'var(--color-chart-5)'];

interface SliceData {
    name: string;
    value: number;
    fill: string;
}

export const DepartmentCostChartContent = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const router = useRouter();

    const handleSliceClick = useCallback(
        (department: string) => {
            if (department === 'Unknown') return;
            router.push(path('tools', { department }));
        },
        [router],
    );

    const chartData = useMemo<SliceData[]>(() => {
        const byDepartment = new Map<string, number>();
        for (const tool of tools) {
            if (tool.status !== 'active') continue;
            const key = tool.owner_department?.trim() || 'Unknown';
            byDepartment.set(key, (byDepartment.get(key) ?? 0) + tool.monthly_cost);
        }
        return Array.from(byDepartment.entries())
            .map(([name, value], index) => ({ name, value, fill: PALETTE[index % PALETTE.length] }))
            .sort((a, b) => b.value - a.value);
    }, [tools]);

    const chartConfig = useMemo<ChartConfig>(() => Object.fromEntries(chartData.map((slice) => [slice.name, { label: slice.name, color: slice.fill }])), [chartData]);

    return (
        <CardContent className="flex flex-col gap-4">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-64">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={95}
                        strokeWidth={2}
                        onClick={(slice) => handleSliceClick((slice as unknown as SliceData).name)}
                        className="cursor-pointer outline-none focus:outline-none"
                    >
                        {chartData.map((slice) => (
                            <Cell key={slice.name} fill={slice.fill} />
                        ))}
                    </Pie>
                </PieChart>
            </ChartContainer>
            <ul className="grid gap-1.5 text-sm sm:grid-cols-2">
                {chartData.map((slice) => (
                    <li key={slice.name}>
                        <button
                            type="button"
                            onClick={() => handleSliceClick(slice.name)}
                            className="flex w-full items-center gap-2 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-70 disabled:hover:bg-transparent"
                            disabled={slice.name === 'Unknown'}
                        >
                            <span className="size-2.5 shrink-0 rounded-full" style={{ background: slice.fill }} />
                            <span className="truncate">{slice.name}</span>
                            <span className="ml-auto shrink-0 font-medium tabular-nums">{formatCurrency(slice.value)}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </CardContent>
    );
};
