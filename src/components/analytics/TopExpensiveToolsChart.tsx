'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { formatCurrency, formatCurrencyCompact } from '@/lib/format';
import { toolsQueries } from '@/queries/toolsQueries';

const TOP_COUNT = 10;

const chartConfig = {
    monthly_cost: { label: 'Monthly cost', color: 'var(--color-chart-2)' },
} satisfies ChartConfig;

export const TopExpensiveToolsChart = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const router = useRouter();

    const handleBarClick = useCallback((name: string) => router.push(`/tools?search=${encodeURIComponent(name)}`), [router]);

    const chartData = useMemo(() => {
        return [...tools]
            .sort((a, b) => b.monthly_cost - a.monthly_cost)
            .slice(0, TOP_COUNT)
            .map((tool) => ({ name: tool.name, monthly_cost: tool.monthly_cost }));
    }, [tools]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top {TOP_COUNT} Expensive Tools</CardTitle>
                <CardDescription>Highest monthly spend, all statuses included — click a bar to open the tool in the catalogue</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 12, right: 24 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="4 4" />
                        <XAxis type="number" tickFormatter={(value) => formatCurrencyCompact(Number(value))} />
                        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={110} tickMargin={8} />
                        <ChartTooltip cursor={{ fill: 'var(--muted)' }} content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
                        <Bar dataKey="monthly_cost" fill="var(--color-monthly_cost)" radius={[0, 6, 6, 0]} className="cursor-pointer" onClick={(payload) => handleBarClick((payload as unknown as (typeof chartData)[number]).name)} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
