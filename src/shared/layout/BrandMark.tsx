import { Zap } from 'lucide-react';
import Link from 'next/link';
import { BRAND } from '@/config/brand';
import { Heading } from '@/shared/components/typography';
import { path } from '@/shared/router';

export const BrandMark = () => {
    return (
        <Link href={path('home')} className="flex items-center gap-2.5" aria-label={`${BRAND.name} — Home`}>
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-sm">
                <Zap className="size-4 text-white" strokeWidth={2.5} />
            </div>
            <Heading level="brand" as="span">
                {BRAND.name}
            </Heading>
        </Link>
    );
};
