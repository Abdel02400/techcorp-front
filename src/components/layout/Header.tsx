import { Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { BrandMark } from '@/components/layout/BrandMark';
import { HeaderSearch } from '@/components/layout/HeaderSearch';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { Navigation } from '@/components/layout/Navigation';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { UserMenu } from '@/components/layout/UserMenu';
import { Button } from '@/components/ui/button';

export const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 md:px-6">
                <MobileMenu />
                <BrandMark />
                <div className="ml-6 hidden md:block">
                    <Navigation orientation="horizontal" />
                </div>
                <Suspense fallback={<div className="ml-auto hidden max-w-sm flex-1 md:block" />}>
                    <HeaderSearch />
                </Suspense>
                <div className="ml-auto flex items-center gap-1 md:ml-0">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" className="relative size-9" aria-label="Notifications">
                        <Bell className="size-4" />
                        <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" aria-hidden />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-9" aria-label="Settings" nativeButton={false} render={<Link href="/settings" />}>
                        <Settings className="size-4" />
                    </Button>
                    <UserMenu />
                </div>
            </div>
        </header>
    );
};
