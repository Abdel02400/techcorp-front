'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { analyticsQueries } from '@/features/analytics/queries/analyticsQueries';
import { Heading } from '@/shared/components/typography';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { formatCurrency, formatCurrencyCompact } from '@/shared/lib/format';
import { cn } from '@/shared/lib/utils';

export const BudgetOverviewCard = () => {
    const { data: analytics } = useSuspenseQuery(analyticsQueries.get());
    const { current_month_total, monthly_limit, previous_month_total, budget_utilization } = analytics.budget_overview;

    const percentage = Math.min(100, (current_month_total / monthly_limit) * 100);
    const delta = current_month_total - previous_month_total;
    const deltaLabel = `${delta >= 0 ? '+' : '−'}${formatCurrency(Math.abs(delta))}`;
    const progressBarTone = percentage >= 90 ? 'from-rose-500 to-red-600' : percentage >= 75 ? 'from-amber-400 to-orange-500' : 'from-violet-500 to-indigo-600';

    return (
        <Card className="p-2">
            <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                <div className="flex flex-col gap-1">
                    <CardTitle>Monthly Budget</CardTitle>
                    <CardDescription>Cumulative spend across the organization for the current month.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div className="flex items-baseline gap-3">
                    <Heading level="kpi" as="span" className="text-4xl">
                        {formatCurrency(current_month_total)}
                    </Heading>
                    <span className="text-lg text-muted-foreground">/ {formatCurrencyCompact(monthly_limit)}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                            Used <span className="font-medium text-foreground">{budget_utilization}%</span> of the monthly limit
                        </span>
                        <span className={cn('font-medium', delta >= 0 ? 'text-amber-500' : 'text-emerald-500')}>{deltaLabel} vs last month</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div className={cn('h-full rounded-full bg-gradient-to-r shadow-sm transition-all', progressBarTone)} style={{ width: `${percentage}%` }} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
