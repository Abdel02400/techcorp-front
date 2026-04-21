'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

const TOOLS_PATH = '/tools';
const SEARCH_PARAM = 'search';
const DEBOUNCE_MS = 300;

export const HeaderSearch = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const isEnabled = pathname === TOOLS_PATH;

    const [value, setValue] = useState(searchParams.get(SEARCH_PARAM) ?? '');

    useEffect(() => {
        if (!isEnabled) return;
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) params.set(SEARCH_PARAM, value);
            else params.delete(SEARCH_PARAM);
            const query = params.toString();
            router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
        }, DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [value, isEnabled, pathname, router, searchParams]);

    return (
        <div className="relative ml-auto hidden max-w-sm flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder={isEnabled ? 'Search in tools catalog...' : 'Search tools...'} value={value} onChange={(event) => setValue(event.target.value)} disabled={!isEnabled} className="pl-9" aria-label="Search" />
        </div>
    );
};
