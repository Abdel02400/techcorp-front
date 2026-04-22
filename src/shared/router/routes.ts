import type { RoutesMap } from './types';

export const routes = {
    home: { path: '/', nav: { label: 'Dashboard' } },
    tools: { path: '/tools', nav: { label: 'Tools' } },
    analytics: { path: '/analytics', nav: { label: 'Analytics' } },
} satisfies RoutesMap;
