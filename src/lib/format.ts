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

export const formatCurrency = (value: number): string => currencyFormatter.format(value);

export const formatCurrencyCompact = (value: number): string => compactCurrencyFormatter.format(value).replace(/K$/, 'k');
