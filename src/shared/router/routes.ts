import { BarChart3, LayoutDashboard, Wrench } from 'lucide-react';
import type { RoutesMap } from './types';

export const routes = {
    home: { path: '/', nav: { label: 'Dashboard', icon: LayoutDashboard } },
    tools: { path: '/tools', nav: { label: 'Tools', icon: Wrench } },
    analytics: { path: '/analytics', nav: { label: 'Analytics', icon: BarChart3 } },
} satisfies RoutesMap;
