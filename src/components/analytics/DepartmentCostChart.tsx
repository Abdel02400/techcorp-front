'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { formatCurrency } from '@/lib/format';
import { toolsQueries } from '@/queries/toolsQueries';

const PALETTE = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)', 'var(--color-chart-4)', 'var(--color-chart-5)'];

interface SliceData {
    name: string;
    value: number;
    fill: string;
}

export const DepartmentCostChart = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());

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

    const total = chartData.reduce((sum, slice) => sum + slice.value, 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Department Cost Breakdown</CardTitle>
                <CardDescription>Active tools only · {formatCurrency(total)} / month</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} strokeWidth={2}>
                            {chartData.map((slice) => (
                                <Cell key={slice.name} fill={slice.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
                <ul className="grid gap-1.5 text-sm sm:grid-cols-2">
                    {chartData.map((slice) => (
                        <li key={slice.name} className="flex items-center gap-2">
                            <span className="size-2.5 shrink-0 rounded-full" style={{ background: slice.fill }} />
                            <span className="truncate">{slice.name}</span>
                            <span className="ml-auto shrink-0 font-medium tabular-nums">{formatCurrency(slice.value)}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};
