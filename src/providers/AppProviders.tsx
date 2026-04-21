'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { type ReactNode, useState } from 'react';
import { isDev } from '@/lib/env';
import { createClientQueryClient } from '@/lib/queryClient';

interface AppProvidersProps {
    children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
    const [queryClient] = useState(() => createClientQueryClient());

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>
                {children}
                {isDev && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
        </ThemeProvider>
    );
};
