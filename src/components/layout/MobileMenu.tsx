'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BRAND } from '@/lib/brand';

export const MobileMenu = () => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="size-9 md:hidden" aria-label="Open menu" />}>
                <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
                <SheetHeader>
                    <SheetTitle>{BRAND.name}</SheetTitle>
                </SheetHeader>
                <div className="mt-2 px-4">
                    <Navigation orientation="vertical" onNavigate={() => setOpen(false)} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
