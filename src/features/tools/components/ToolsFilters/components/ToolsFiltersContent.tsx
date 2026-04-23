'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toolsQueries } from '@/features/tools/queries/toolsQueries';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { path } from '@/shared/router';

const ALL_VALUE = '__all__';
const ALL_DEPARTMENTS_LABEL = 'All departments';
const ALL_STATUSES_LABEL = 'All statuses';
const ALL_CATEGORIES_LABEL = 'All categories';
const FILTER_KEYS = ['department', 'status', 'category', 'min_cost', 'max_cost'] as const;

const STATUS_LABELS: Record<string, string> = {
    active: 'Active',
    expiring: 'Expiring',
    unused: 'Unused',
};

const uniqueStrings = (values: (string | undefined)[]): string[] => {
    return Array.from(new Set(values.filter((value): value is string => Boolean(value)))).sort();
};

const formatIdentity = (value: string, allLabel: string) => (value === ALL_VALUE ? allLabel : value);
const formatStatus = (value: string, allLabel: string) => (value === ALL_VALUE ? allLabel : (STATUS_LABELS[value] ?? value));

export const ToolsFiltersContent = () => {
    const { data: tools } = useSuspenseQuery(toolsQueries.all());
    const router = useRouter();
    const searchParams = useSearchParams();

    const departments = useMemo(() => uniqueStrings(tools.map((tool) => tool.owner_department)), [tools]);
    const categories = useMemo(() => uniqueStrings(tools.map((tool) => tool.category)), [tools]);

    const currentDepartment = searchParams.get('department') ?? ALL_VALUE;
    const currentStatus = searchParams.get('status') ?? ALL_VALUE;
    const currentCategory = searchParams.get('category') ?? ALL_VALUE;
    const currentMinCost = searchParams.get('min_cost') ?? '';
    const currentMaxCost = searchParams.get('max_cost') ?? '';

    const updateParam = useCallback(
        (key: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== ALL_VALUE) params.set(key, value);
            else params.delete(key);
            router.replace(path('tools', Object.fromEntries(params.entries())), { scroll: false });
        },
        [router, searchParams],
    );

    const clearFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        FILTER_KEYS.forEach((key) => params.delete(key));
        router.replace(path('tools', Object.fromEntries(params.entries())), { scroll: false });
    }, [router, searchParams]);

    const hasActiveFilters = FILTER_KEYS.some((key) => searchParams.has(key));

    return (
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Select value={currentDepartment} onValueChange={(value) => updateParam('department', value)}>
                <SelectTrigger className="w-44" aria-label="Filter by department">
                    <SelectValue>{formatIdentity(currentDepartment, ALL_DEPARTMENTS_LABEL)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_VALUE}>{ALL_DEPARTMENTS_LABEL}</SelectItem>
                    {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                            {department}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={currentStatus} onValueChange={(value) => updateParam('status', value)}>
                <SelectTrigger className="w-36" aria-label="Filter by status">
                    <SelectValue>{formatStatus(currentStatus, ALL_STATUSES_LABEL)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_VALUE}>{ALL_STATUSES_LABEL}</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expiring">Expiring</SelectItem>
                    <SelectItem value="unused">Unused</SelectItem>
                </SelectContent>
            </Select>

            <Select value={currentCategory} onValueChange={(value) => updateParam('category', value)}>
                <SelectTrigger className="w-44" aria-label="Filter by category">
                    <SelectValue>{formatIdentity(currentCategory, ALL_CATEGORIES_LABEL)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_VALUE}>{ALL_CATEGORIES_LABEL}</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                            {category}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <div className="flex items-center gap-1.5">
                <Input type="number" inputMode="numeric" min={0} placeholder="Min €" className="w-24" value={currentMinCost} onChange={(event) => updateParam('min_cost', event.target.value)} aria-label="Minimum monthly cost" />
                <span className="text-muted-foreground">–</span>
                <Input type="number" inputMode="numeric" min={0} placeholder="Max €" className="w-24" value={currentMaxCost} onChange={(event) => updateParam('max_cost', event.target.value)} aria-label="Maximum monthly cost" />
            </div>

            {hasActiveFilters ? (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                    <X className="size-4" />
                    Clear filters
                </Button>
            ) : null}
        </div>
    );
};
