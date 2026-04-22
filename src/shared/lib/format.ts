import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '@/config/i18n';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_MONTH = 30;
const DAYS_PER_YEAR = 365;
const TODAY_LABEL = 'today' as const;
const MISSING_VALUE_FALLBACK = '—' as const;

const currencyFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: DEFAULT_CURRENCY,
    maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: 'currency',
    currency: DEFAULT_CURRENCY,
    notation: 'compact',
    maximumFractionDigits: 1,
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat(DEFAULT_LOCALE, { numeric: 'auto' });

export const formatCurrency = (value: number): string => currencyFormatter.format(value);

export const formatCurrencyCompact = (value: number): string => compactCurrencyFormatter.format(value).replace(/K$/, 'k');

export const formatRelativeTime = (dateStr?: string): string => {
    if (!dateStr) return MISSING_VALUE_FALLBACK;
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return MISSING_VALUE_FALLBACK;

    const diffMs = date.getTime() - Date.now();
    const absDays = Math.round(Math.abs(diffMs) / MS_PER_DAY);
    const sign = Math.sign(diffMs);

    if (absDays < 1) return TODAY_LABEL;
    if (absDays < DAYS_PER_MONTH) return relativeTimeFormatter.format(sign * absDays, 'day');
    if (absDays < DAYS_PER_YEAR) return relativeTimeFormatter.format(sign * Math.round(absDays / DAYS_PER_MONTH), 'month');
    return relativeTimeFormatter.format(sign * Math.round(absDays / DAYS_PER_YEAR), 'year');
};
