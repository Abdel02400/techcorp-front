'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/shared/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useMounted } from '@/shared/hooks/useMounted';

const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
} as const;

const THEME_ITEMS = [
    { value: THEMES.LIGHT, label: 'Light', icon: Sun },
    { value: THEMES.DARK, label: 'Dark', icon: Moon },
    { value: THEMES.SYSTEM, label: 'System', icon: Monitor },
] as const;

export const ThemeToggle = () => {
    const mounted = useMounted();
    const { setTheme, resolvedTheme } = useTheme();

    if (!mounted) return <Skeleton className="size-9 rounded-md" />;

    const ActiveIcon = resolvedTheme === THEMES.DARK ? Moon : Sun;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-9" aria-label="Toggle theme" />}>
                <ActiveIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {THEME_ITEMS.map(({ value, label, icon: Icon }) => (
                    <DropdownMenuItem key={value} onClick={() => setTheme(value)}>
                        <Icon className="size-4" />
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
