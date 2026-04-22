import { BRAND } from '@/config/brand';

interface LogoProps {
    size?: number;
}

const DEFAULT_SIZE = 32;
const ICON_RATIO = 0.625;
const RADIUS_RATIO = 0.3;

export const Logo = ({ size = DEFAULT_SIZE }: LogoProps) => {
    const iconSize = Math.round(size * ICON_RATIO);
    const borderRadius = Math.round(size * RADIUS_RATIO);

    return (
        <div
            style={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${BRAND.gradient.from} 0%, ${BRAND.gradient.to} 100%)`,
                borderRadius,
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            }}
        >
            <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
            </svg>
        </div>
    );
};
