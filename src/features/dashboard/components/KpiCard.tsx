import type { LucideIcon } from 'lucide-react';
import { Heading, Text } from '@/shared/components/typography';
import { Card } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';

export type KpiVariant = 'emerald' | 'violet' | 'orange' | 'rose';

interface KpiCardProps {
    title: string;
    value: string;
    secondaryValue?: string;
    trend: string;
    variant: KpiVariant;
    icon: LucideIcon;
}

const variantGradients: Record<KpiVariant, string> = {
    emerald: 'bg-gradient-to-br from-emerald-400 to-teal-600',
    violet: 'bg-gradient-to-br from-violet-500 to-indigo-600',
    orange: 'bg-gradient-to-br from-orange-400 to-red-500',
    rose: 'bg-gradient-to-br from-rose-500 to-pink-600',
};

export const KpiCard = ({ title, value, secondaryValue, trend, variant, icon: Icon }: KpiCardProps) => {
    return (
        <Card className="relative overflow-hidden p-6 transition-colors hover:border-foreground/20">
            <div className="flex items-start justify-between">
                <Text variant="label">{title}</Text>
                <div className={cn('flex size-8 items-center justify-center rounded-lg shadow-sm', variantGradients[variant])}>
                    <Icon className="size-4 text-white" strokeWidth={2.5} />
                </div>
            </div>
            <div className="mt-6 flex items-baseline gap-1">
                <Heading level="kpi" as="span">
                    {value}
                </Heading>
                {secondaryValue ? <span className="text-lg text-muted-foreground">{secondaryValue}</span> : null}
            </div>
            <div className="mt-3">
                <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white shadow-sm', variantGradients[variant])}>{trend}</span>
            </div>
        </Card>
    );
};
