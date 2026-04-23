import { NavLink } from '@/shared/components/NavLink';
import { navEntries } from '@/shared/router';

export const Navigation = () => {
    return (
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {navEntries.map((entry) => (
                <NavLink key={entry.href} href={entry.href}>
                    {entry.label}
                </NavLink>
            ))}
        </nav>
    );
};
