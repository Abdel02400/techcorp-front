'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useId, type ReactNode } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { toolInputSchema, type ToolInput } from '@/features/tools/schemas/tool';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';

interface ToolFormProps {
    defaultValues?: Partial<ToolInput>;
    onSubmit: SubmitHandler<ToolInput>;
    submitLabel?: string;
    isSubmitting?: boolean;
}

const BASE_DEFAULT_VALUES: ToolInput = {
    name: '',
    vendor: '',
    category: '',
    owner_department: '',
    status: 'active',
    monthly_cost: 0,
    active_users_count: 0,
    website_url: '',
    icon_url: '',
    description: '',
};

export const ToolForm = ({ defaultValues, onSubmit, submitLabel = 'Save', isSubmitting }: ToolFormProps) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ToolInput>({
        resolver: standardSchemaResolver(toolInputSchema),
        defaultValues: { ...BASE_DEFAULT_VALUES, ...defaultValues },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Field label="Name" error={errors.name?.message} required>
                {(id) => <Input id={id} {...register('name')} placeholder="Slack" />}
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Vendor" error={errors.vendor?.message}>
                    {(id) => <Input id={id} {...register('vendor')} />}
                </Field>
                <Field label="Category" error={errors.category?.message}>
                    {(id) => <Input id={id} {...register('category')} />}
                </Field>
                <Field label="Owner department" error={errors.owner_department?.message}>
                    {(id) => <Input id={id} {...register('owner_department')} />}
                </Field>
                <Field label="Status" error={errors.status?.message} required>
                    {(id) => (
                        <Controller
                            control={control}
                            name="status"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id={id}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="expiring">Expiring</SelectItem>
                                        <SelectItem value="unused">Unused</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    )}
                </Field>
                <Field label="Monthly cost (€)" error={errors.monthly_cost?.message} required>
                    {(id) => <Input id={id} type="number" step="0.01" min={0} {...register('monthly_cost', { valueAsNumber: true })} />}
                </Field>
                <Field label="Active users" error={errors.active_users_count?.message} required>
                    {(id) => <Input id={id} type="number" min={0} {...register('active_users_count', { valueAsNumber: true })} />}
                </Field>
                <Field label="Website URL" error={errors.website_url?.message}>
                    {(id) => <Input id={id} type="url" placeholder="https://..." {...register('website_url')} />}
                </Field>
                <Field label="Icon URL" error={errors.icon_url?.message}>
                    {(id) => <Input id={id} type="url" placeholder="https://..." {...register('icon_url')} />}
                </Field>
            </div>
            <Field label="Description" error={errors.description?.message}>
                {(id) => <Textarea id={id} rows={3} {...register('description')} />}
            </Field>
            <Button type="submit" disabled={isSubmitting} className="self-end">
                {isSubmitting ? 'Saving…' : submitLabel}
            </Button>
        </form>
    );
};

interface FieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: (id: string) => ReactNode;
}

const Field = ({ label, error, required, children }: FieldProps) => {
    const id = useId();
    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id}>
                {label}
                {required ? <span className="text-destructive"> *</span> : null}
            </Label>
            {children(id)}
            {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>
    );
};
