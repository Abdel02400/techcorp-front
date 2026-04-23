'use client';

import { useState } from 'react';
import { cn } from '@/shared/lib/utils';

interface ToolIconProps {
    url?: string;
    name: string;
    className?: string;
}

const isValidAbsoluteUrl = (value: string): boolean => {
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

export const ToolIcon = ({ url, name, className }: ToolIconProps) => {
    const [hasError, setHasError] = useState(false);
    const showFallback = !url || !isValidAbsoluteUrl(url) || hasError;

    if (showFallback) {
        return <div className={cn('flex size-6 items-center justify-center rounded bg-muted text-xs font-semibold text-muted-foreground', className)}>{name[0]?.toUpperCase() ?? '?'}</div>;
    }

    // eslint-disable-next-line @next/next/no-img-element -- External icon URLs come from arbitrary vendor CDNs; whitelisting each in next.config is not worth it for 24x24 icons
    return <img src={url} alt="" onError={() => setHasError(true)} className={cn('size-6 rounded object-contain', className)} />;
};
