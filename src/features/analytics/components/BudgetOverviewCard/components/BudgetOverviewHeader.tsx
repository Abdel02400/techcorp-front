import { CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

export const BudgetOverviewHeader = () => (
    <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div className="flex flex-col gap-1">
            <CardTitle>Monthly Budget</CardTitle>
            <CardDescription>Cumulative spend across the organization for the current month.</CardDescription>
        </div>
    </CardHeader>
);
