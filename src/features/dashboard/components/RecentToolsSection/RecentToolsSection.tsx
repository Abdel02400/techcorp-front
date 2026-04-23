import { RecentToolsContent } from '@/features/dashboard/components/RecentToolsSection/components/RecentToolsContent';
import { RecentToolsHeader } from '@/features/dashboard/components/RecentToolsSection/components/RecentToolsHeader';
import { RecentToolsSkeleton } from '@/features/dashboard/components/RecentToolsSection/components/RecentToolsSkeleton';
import { Block } from '@/shared/components/Block';
import { Card } from '@/shared/components/ui/card';

export const RecentToolsSection = () => (
    <Card className="overflow-hidden py-0">
        <RecentToolsHeader />
        <div className="px-6 pb-6">
            <Block skeleton={<RecentToolsSkeleton />}>
                <RecentToolsContent />
            </Block>
        </div>
    </Card>
);
