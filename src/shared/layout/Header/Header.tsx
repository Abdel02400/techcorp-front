import { Suspense } from 'react';
import { BrandMark } from '@/shared/layout/Header/components/BrandMark';
import { HeaderActions } from '@/shared/layout/Header/components/HeaderActions/HeaderActions';
import { HeaderSearch } from '@/shared/layout/Header/components/HeaderSearch';
import { MobileMenu } from '@/shared/layout/Header/components/MobileMenu';
import { Navigation } from '@/shared/layout/Header/components/Navigation';

export const Header = () => {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-app items-center gap-4 px-4 md:px-6">
                <MobileMenu />
                <BrandMark />
                <Navigation orientation="horizontal" className="ml-6 hidden md:flex" />
                <Suspense fallback={<div className="ml-auto hidden max-w-sm flex-1 md:block" />}>
                    <HeaderSearch />
                </Suspense>
                <HeaderActions />
            </div>
        </header>
    );
};
