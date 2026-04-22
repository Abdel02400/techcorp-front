import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

const headingVariants = cva('font-semibold tracking-tight', {
    variants: {
        level: {
            page: 'text-3xl md:text-4xl',
            section: 'text-lg',
            kpi: 'text-3xl',
            brand: 'text-base',
        },
    },
    defaultVariants: { level: 'section' },
});

interface HeadingProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof headingVariants> {
    as?: ElementType;
}

export const Heading = ({ className, level, as: Component = 'h2', ...props }: HeadingProps) => {
    return <Component className={cn(headingVariants({ level }), className)} {...props} />;
};

const textVariants = cva('', {
    variants: {
        variant: {
            muted: 'text-muted-foreground',
            label: 'text-sm font-medium text-muted-foreground',
            caption: 'text-xs text-muted-foreground',
        },
    },
    defaultVariants: { variant: 'muted' },
});

interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
    as?: ElementType;
}

export const Text = ({ className, variant, as: Component = 'p', ...props }: TextProps) => {
    return <Component className={cn(textVariants({ variant }), className)} {...props} />;
};
