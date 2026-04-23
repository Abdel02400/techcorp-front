'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BlockRetry } from '@/shared/components/BlockRetry';
import { Card, CardContent } from '@/shared/components/ui/card';

interface BlockCardProps {
    header: ReactNode;
    skeleton: ReactNode;
    children: ReactNode;
}

export const BlockCard = ({ header, skeleton, children }: BlockCardProps) => (
    <Card>
        {header}
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({ resetErrorBoundary }) => (
                        <CardContent>
                            <BlockRetry onRetry={resetErrorBoundary} />
                        </CardContent>
                    )}
                >
                    <Suspense fallback={skeleton}>{children}</Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    </Card>
);
