import { Bell } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export const NotificationsButton = () => {
    return (
        <Button variant="ghost" size="icon" className="relative size-9" aria-label="Notifications">
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" aria-hidden />
        </Button>
    );
};
