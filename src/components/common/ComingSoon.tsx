interface ComingSoonProps {
    title: string;
    subtitle?: string;
}

export const ComingSoon = ({ title, subtitle = 'Coming soon.' }: ComingSoonProps) => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
        </main>
    );
};
