import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu';

const DEMO_USER = {
    name: 'Admin User',
    email: 'admin@techcorp.internal',
    initials: 'AU',
} as const;

export const UserMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" className="size-9 rounded-full p-0" aria-label="User menu" />}>
                <Avatar className="size-9">
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-medium text-white">{DEMO_USER.initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-medium">{DEMO_USER.name}</span>
                            <span className="text-xs text-muted-foreground">{DEMO_USER.email}</span>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                    <LogOut className="size-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
