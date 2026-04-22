'use client';

import { useSuspenseQueries } from '@tanstack/react-query';
import { Banknote, Building2, UsersRound, Wrench } from 'lucide-react';
import { KpiCard } from '@/features/dashboard/components/KpiCard';
import { formatCurrency, formatCurrencyCompact } from '@/shared/lib/format';
import { analyticsQueries } from '@/features/analytics/queries/analyticsQueries';
import { departmentsQueries } from '@/features/departments/queries/departmentsQueries';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';

export const KpisSection = () => {
    const [{ data: analytics }, { data: tools }, { data: departments }] = useSuspenseQueries({
        queries: [analyticsQueries.get(), toolsQueries.all(), departmentsQueries.all()],
    });

    const activeToolsCount = tools.filter((tool) => tool.status === 'active').length;

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
                title="Monthly Budget"
                value={formatCurrency(analytics.budget_overview.current_month_total)}
                secondaryValue={`/${formatCurrencyCompact(analytics.budget_overview.monthly_limit)}`}
                trend={analytics.kpi_trends.budget_change}
                variant="emerald"
                icon={Banknote}
            />
            <KpiCard title="Active Tools" value={String(activeToolsCount)} trend={analytics.kpi_trends.tools_change} variant="violet" icon={Wrench} />
            <KpiCard title="Departments" value={String(departments.length)} trend={analytics.kpi_trends.departments_change} variant="orange" icon={Building2} />
            <KpiCard title="Cost / User" value={formatCurrency(analytics.cost_analytics.cost_per_user)} trend={analytics.kpi_trends.cost_per_user_change} variant="rose" icon={UsersRound} />
        </div>
    );
};
