'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/shared/layout/navItems';
import { cn } from '@/shared/lib/utils';

interface NavigationProps {
    orientation?: 'horizontal' | 'vertical';
    onNavigate?: () => void;
}

const isItemActive = (itemHref: string, pathname: string): boolean => {
    if (itemHref === '/') return pathname === '/';
    return pathname === itemHref || pathname.startsWith(`${itemHref}/`);
};

export const Navigation = ({ orientation = 'horizontal', onNavigate }: NavigationProps) => {
    const pathname = usePathname();

    return (
        <nav className={cn('flex gap-1', orientation === 'vertical' ? 'flex-col' : 'flex-row items-center')}>
            {NAV_ITEMS.map((item) => {
                const active = isItemActive(item.href, pathname);
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className={cn('rounded-md px-3 py-1.5 text-sm font-medium transition-colors', active ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground', orientation === 'vertical' && 'w-full')}
                        aria-current={active ? 'page' : undefined}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};
