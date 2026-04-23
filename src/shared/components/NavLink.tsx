'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

const navLinkVariants = cva('', {
    variants: {
        variant: {
            pill: 'btn-link',
            tab: 'flex w-full flex-col items-center gap-1 py-2 text-link-sm text-muted-foreground transition-colors aria-[current=page]:text-primary',
        },
    },
    defaultVariants: {
        variant: 'pill',
    },
});

type NavLinkProps = PropsWithChildren<
    VariantProps<typeof navLinkVariants> & {
        href: Route;
    }
>;

const matchActive = (href: string, pathname: string): boolean => pathname === href || pathname.startsWith(`${href}/`);

export const NavLink = ({ href, children, variant }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = matchActive(href, pathname);
    return (
        <Link href={href} aria-current={isActive ? 'page' : undefined} className={navLinkVariants({ variant })}>
            {children}
        </Link>
    );
};
