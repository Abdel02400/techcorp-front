'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BlockRetry } from '@/shared/components/BlockRetry';

interface BlockProps {
    skeleton: ReactNode;
    children: ReactNode;
}

export const Block = ({ skeleton, children }: BlockProps) => (
    <QueryErrorResetBoundary>
        {({ reset }) => (
            <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => <BlockRetry onRetry={resetErrorBoundary} />}>
                <Suspense fallback={skeleton}>{children}</Suspense>
            </ErrorBoundary>
        )}
    </QueryErrorResetBoundary>
);
