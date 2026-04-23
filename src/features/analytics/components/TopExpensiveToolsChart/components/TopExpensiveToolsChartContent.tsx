'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import { CardContent } from '@/shared/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/components/ui/chart';
import { formatCurrency, formatCurrencyCompact } from '@/shared/lib/format';
import { path } from '@/shared/router';

const TOP_COUNT = 10;
const MAX_LABEL_LENGTH = 18;

const chartConfig = {
    monthly_cost: { label: 'Monthly cost', color: 'var(--color-chart-2)' },
} satisfies ChartConfig;

const truncateLabel = (label: string): string => (label.length > MAX_LABEL_LENGTH ? `${label.slice(0, MAX_LABEL_LENGTH - 1)}…` : label);

export const TopExpensiveToolsChartContent = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const router = useRouter();

    const handleBarClick = useCallback((name: string) => router.push(path('tools', { search: name })), [router]);

    const chartData = useMemo(() => {
        return [...tools]
            .sort((a, b) => b.monthly_cost - a.monthly_cost)
            .slice(0, TOP_COUNT)
            .map((tool) => ({ name: tool.name, monthly_cost: tool.monthly_cost }));
    }, [tools]);

    return (
        <CardContent>
            <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full min-w-0">
                <BarChart data={chartData} layout="vertical" margin={{ left: 12, right: 24 }}>
                    <CartesianGrid horizontal={false} strokeDasharray="4 4" />
                    <XAxis type="number" tickFormatter={(value) => formatCurrencyCompact(Number(value))} />
                    <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={140} tickMargin={8} tickFormatter={truncateLabel} />
                    <ChartTooltip cursor={{ fill: 'var(--muted)' }} content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                    <Bar dataKey="monthly_cost" fill="var(--color-monthly_cost)" radius={[0, 6, 6, 0]} className="cursor-pointer" onClick={(payload) => handleBarClick((payload as unknown as (typeof chartData)[number]).name)} />
                </BarChart>
            </ChartContainer>
        </CardContent>
    );
};
