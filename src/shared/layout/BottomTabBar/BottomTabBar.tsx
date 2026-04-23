'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import { SearchSheet } from '@/shared/layout/BottomTabBar/components/SearchSheet';
import { NavLink } from '@/shared/components/NavLink';
import { navEntries } from '@/shared/router';

export const BottomTabBar = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            <nav aria-label="Primary" className="sticky inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
                <ul className="flex items-stretch justify-around">
                    {navEntries.map((entry) => {
                        const Icon = entry.icon;
                        return (
                            <li key={entry.href} className="flex-1">
                                <NavLink href={entry.href} variant="tab">
                                    <Icon className="size-5" aria-hidden="true" />
                                    <span>{entry.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                    <li className="flex-1">
                        <button type="button" onClick={() => setSearchOpen(true)} aria-expanded={searchOpen} aria-label="Search tools" className="flex w-full flex-col items-center gap-1 py-2 text-link-sm text-muted-foreground transition-colors aria-expanded:text-primary">
                            <Search className="size-5" aria-hidden="true" />
                            <span>Search</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <SearchSheet open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
};
