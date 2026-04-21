const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

export const formatCurrency = (value: number): string => currencyFormatter.format(value);

export const formatCurrencyCompact = (value: number): string => compactCurrencyFormatter.format(value).replace(/K$/, 'k');

export const formatRelativeTime = (dateStr?: string): string => {
    if (!dateStr) return '—';
    const diffMs = new Date(dateStr).getTime() - Date.now();
    const absDays = Math.round(Math.abs(diffMs) / (24 * 60 * 60 * 1000));
    const sign = Math.sign(diffMs);
    if (absDays < 1) return 'today';
    if (absDays < 30) return relativeTimeFormatter.format(sign * absDays, 'day');
    if (absDays < 365) return relativeTimeFormatter.format(sign * Math.round(absDays / 30), 'month');
    return relativeTimeFormatter.format(sign * Math.round(absDays / 365), 'year');
};
