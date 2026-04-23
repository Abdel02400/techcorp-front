import { CalendarDays } from 'lucide-react';
import { Heading } from '@/shared/components/typography';

export const RecentToolsHeader = () => (
    <div className="flex items-center justify-between px-6 py-4">
        <Heading level="section" as="h2">
            Recent Tools
        </Heading>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />
            <span>Last 30 days</span>
        </div>
    </div>
);
