import type { ToolStatus } from '@/features/tools/schemas/enums';
import { cn } from '@/shared/lib/utils';

const statusStyles: Record<ToolStatus, string> = {
    active: 'bg-gradient-to-br from-emerald-400 to-teal-600',
    expiring: 'bg-gradient-to-br from-orange-400 to-amber-500',
    unused: 'bg-gradient-to-br from-rose-500 to-pink-600',
};

const statusLabels: Record<ToolStatus, string> = {
    active: 'Active',
    expiring: 'Expiring',
    unused: 'Unused',
};

interface StatusBadgeProps {
    status: ToolStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
    return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white shadow-sm', statusStyles[status])}>{statusLabels[status]}</span>;
};
