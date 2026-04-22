import { NotificationsButton } from '@/shared/layout/Header/components/HeaderActions/components/NotificationsButton';
import { SettingsButton } from '@/shared/layout/Header/components/HeaderActions/components/SettingsButton';
import { ThemeToggle } from '@/shared/layout/Header/components/HeaderActions/components/ThemeToggle';
import { UserMenu } from '@/shared/layout/Header/components/HeaderActions/components/UserMenu';

export const HeaderActions = () => {
    return (
        <div className="ml-auto flex items-center gap-1 md:ml-0">
            <ThemeToggle />
            <NotificationsButton />
            <SettingsButton />
            <UserMenu />
        </div>
    );
};
