'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

interface BlockRetryProps {
    onRetry: () => void;
    message?: string;
}

const DEFAULT_MESSAGE = 'Failed to load data for this section.';

export const BlockRetry = ({ onRetry, message = DEFAULT_MESSAGE }: BlockRetryProps) => (
    <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <AlertCircle className="size-8 text-destructive" />
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="size-4" />
            Retry
        </Button>
    </div>
);
