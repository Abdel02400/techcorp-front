'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useMounted } from '@/hooks/useMounted';

export const ThemeToggle = () => {
    const mounted = useMounted();
    const { setTheme, resolvedTheme } = useTheme();

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="size-9" aria-label="Toggle theme" disabled>
                <Sun className="size-4" />
            </Button>
        );
    }

    const ActiveIcon = resolvedTheme === 'dark' ? Moon : Sun;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="size-9" aria-label="Toggle theme" />}>
                <ActiveIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Sun className="size-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Moon className="size-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Monitor className="size-4" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
