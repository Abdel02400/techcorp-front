import { BRAND } from '@/lib/brand';

const Home = () => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <h1 className="text-4xl font-bold tracking-tight">
                {BRAND.name} — {BRAND.productName}
            </h1>
            <p className="text-muted-foreground">Dashboard coming soon.</p>
        </main>
    );
};

export default Home;
