import { ImageResponse } from 'next/og';
import { Logo } from '@/shared/components/Logo';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

const Icon = () => {
    return new ImageResponse(<Logo size={size.width} />, { ...size });
};

export default Icon;
