import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { Logo } from '@/shared/components/Logo';
import { Heading } from '@/shared/components/typography';
import { path } from '@/shared/router';

export const BrandMark = () => {
    return (
        <Link href={path('home')} className="flex items-center gap-2.5" aria-label={`${BRAND.name} — Home`}>
            <Logo />
            <Heading level="brand" as="span">
                {BRAND.name}
            </Heading>
        </Link>
    );
};
