import { Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { path } from '@/shared/router';

export const SettingsButton = () => {
    return (
        <Button variant="ghost" size="icon" className="size-9" aria-label="Settings" nativeButton={false} render={<Link href={path('settings')} />}>
            <Settings className="size-4" />
        </Button>
    );
};
