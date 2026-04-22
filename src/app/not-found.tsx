import { Home, SearchX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { path } from '@/shared/router';

const NotFoundPage = () => {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <SearchX className="size-7" strokeWidth={2} />
            </div>
            <div className="flex max-w-md flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
                <p className="text-muted-foreground">This route doesn&apos;t exist in the TechCorp dashboard, or it has been moved.</p>
            </div>
            <Button variant="default" nativeButton={false} render={<Link href={path('home')} />}>
                <Home className="size-4" />
                Back to dashboard
            </Button>
        </main>
    );
};

export default NotFoundPage;
