import type { Metadata } from 'next';
import { BRAND } from '@/config/brand';

export const rootMetadata: Metadata = {
    title: `${BRAND.name} — ${BRAND.productName} Dashboard`,
    description: BRAND.tagline,
};
