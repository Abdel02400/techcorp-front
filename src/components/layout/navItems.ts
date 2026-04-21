export const NAV_ITEMS = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tools', href: '/tools' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Settings', href: '/settings' },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
