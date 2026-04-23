import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';
import { createRouter } from './createRouter';
import { routes } from './routes';

export const { path } = createRouter(routes);

export interface NavEntry {
    label: string;
    href: Route;
    icon: LucideIcon;
}

export const navEntries: NavEntry[] = Object.values(routes).flatMap((config) => (config.nav ? [{ label: config.nav.label, href: config.path, icon: config.nav.icon }] : []));

export type { NavMeta, PathOptions, RouteConfig, RoutesMap } from './types';
