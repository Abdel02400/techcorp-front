import { KpisContent } from '@/features/dashboard/components/KpisSection/components/KpisContent';
import { KpisSkeleton } from '@/features/dashboard/components/KpisSection/components/KpisSkeleton';
import { Block } from '@/shared/components/Block';

export const KpisSection = () => (
    <Block skeleton={<KpisSkeleton />}>
        <KpisContent />
    </Block>
);
