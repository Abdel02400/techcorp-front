'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { startTransition, useOptimistic, useState } from 'react';
import { path } from '@/shared/router';

const TOOLS_PATH = path('tools');
const SEARCH_PARAM = 'search';

export const useSearchParam = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const isEnabled = pathname === TOOLS_PATH;
    const urlValue = searchParams.get(SEARCH_PARAM) ?? '';

    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [optimisticUrlValue, setOptimisticUrlValue] = useOptimistic(urlValue);

    const value = pendingValue ?? optimisticUrlValue;

    const setValue = (next: string) => setPendingValue(next);

    const pushSearch = (search: string) => {
        const query = Object.fromEntries(searchParams.entries());
        if (search) query[SEARCH_PARAM] = search;
        else delete query[SEARCH_PARAM];
        router.replace(path('tools', query), { scroll: false });
    };

    const commit = () => {
        if (!isEnabled || pendingValue === null) return;
        const toCommit = pendingValue;
        startTransition(() => {
            setOptimisticUrlValue(toCommit);
            pushSearch(toCommit);
            setPendingValue(null);
        });
    };

    const clear = () => {
        if (!isEnabled) return;
        startTransition(() => {
            setOptimisticUrlValue('');
            pushSearch('');
            setPendingValue(null);
        });
    };

    return { value, setValue, commit, clear, isEnabled };
};
