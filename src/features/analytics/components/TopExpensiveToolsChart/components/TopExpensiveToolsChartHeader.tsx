import { CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';

const TOP_COUNT = 10;

export const TopExpensiveToolsChartHeader = () => (
    <CardHeader>
        <CardTitle>Top {TOP_COUNT} Expensive Tools</CardTitle>
        <CardDescription>Highest monthly spend, all statuses included — click a bar to open the tool in the catalogue</CardDescription>
    </CardHeader>
);
