import './globals.css';
import { inter } from '@/lib/fonts';
import { AppProviders } from '@/providers/AppProviders';

export { rootMetadata as metadata } from '@/lib/metadata';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="flex min-h-full flex-col bg-background text-foreground">
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
};

export default RootLayout;
