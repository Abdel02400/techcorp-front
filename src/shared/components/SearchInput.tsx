'use client';

import { Search, X } from 'lucide-react';
import { Suspense, useRef } from 'react';
import { actionKeys } from '@/config/actionKeys';
import { Input } from '@/shared/components/ui/input';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { useSearchParam } from '@/shared/hooks/useSearchParam';

interface SearchInputProps {
    onSubmit?: () => void;
    autoFocus?: boolean;
}

const SearchInputContent = ({ onSubmit, autoFocus = false }: SearchInputProps) => {
    const { value, setValue, commit, clear, isEnabled } = useSearchParam();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== actionKeys.ENTER) return;
        commit();
        onSubmit?.();
    };

    const handleClear = () => {
        clear();
        inputRef.current?.focus();
    };

    const showClear = isEnabled && value.length > 0;

    return (
        <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                ref={inputRef}
                type="text"
                autoFocus={autoFocus}
                placeholder={isEnabled ? 'Search in tools catalog...' : 'Search tools...'}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!isEnabled}
                className="pl-9 pr-9"
                aria-label="Search"
            />
            {showClear && (
                <button type="button" onClick={handleClear} aria-label="Clear search" className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
};

export const SearchInput = (props: SearchInputProps) => (
    <Suspense fallback={<Skeleton className="h-9 rounded-md" />}>
        <SearchInputContent {...props} />
    </Suspense>
);
