import { Heading, Text } from '@/shared/components/typography';

interface ComingSoonProps {
    title: string;
    subtitle?: string;
}

export const ComingSoon = ({ title, subtitle = 'Coming soon.' }: ComingSoonProps) => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <Heading level="page" as="h1">
                {title}
            </Heading>
            <Text variant="muted">{subtitle}</Text>
        </main>
    );
};
