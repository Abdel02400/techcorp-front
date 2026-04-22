import type { Route } from 'next';
import { createRouter } from './createRouter';
import { routes } from './routes';

export const { path } = createRouter(routes);

export interface NavEntry {
    label: string;
    href: Route;
}

export const navEntries: NavEntry[] = Object.values(routes).flatMap((config) => (config.nav ? [{ label: config.nav.label, href: config.path as Route }] : []));

export type { NavMeta, PathOptions, RouteConfig, RoutesMap } from './types';
