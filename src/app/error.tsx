'use client';

import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { isDev } from '@/config/env';
import { Button } from '@/shared/components/ui/button';
import { path } from '@/shared/router';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="size-7" strokeWidth={2} />
            </div>
            <div className="flex max-w-md flex-col gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
                <p className="text-muted-foreground">The page failed to load. The backend may be temporarily unavailable, or the data returned an unexpected shape.</p>
                {isDev && error.message ? <p className="rounded-md bg-muted px-3 py-2 text-left font-mono text-xs text-muted-foreground">{error.message}</p> : null}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
                <Button onClick={() => reset()} variant="default">
                    <RotateCcw className="size-4" />
                    Try again
                </Button>
                <Button variant="ghost" nativeButton={false} render={<Link href={path('home')} />}>
                    <Home className="size-4" />
                    Back to dashboard
                </Button>
            </div>
        </main>
    );
};

export default ErrorPage;
