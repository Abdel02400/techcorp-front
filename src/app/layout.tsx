import './globals.css';
import { BottomTabBar } from '@/shared/layout/BottomTabBar/BottomTabBar';
import { Header } from '@/shared/layout/Header/Header';
import { inter } from '@/config/fonts';
import { AppProviders } from '@/shared/providers/AppProviders';

export { rootMetadata as metadata } from '@/config/metadata';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang="fr" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="flex min-h-full flex-col bg-background text-foreground">
                <AppProviders>
                    <Header />
                    {children}
                    <BottomTabBar />
                </AppProviders>
            </body>
        </html>
    );
};

export default RootLayout;
