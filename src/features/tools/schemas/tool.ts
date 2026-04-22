import { z } from 'zod';
import { idSchema, isoDateTimeSchema, nonEmptyStringSchema } from '@/shared/schemas/commonSchemas';
import { toolStatusSchema } from '@/features/tools/schemas/enums';

export const toolDtoSchema = z.object({
    id: idSchema,
    name: nonEmptyStringSchema,
    description: z.string().optional(),
    vendor: z.string().optional(),
    category: z.string().optional(),
    monthly_cost: z.coerce.number().nonnegative(),
    previous_month_cost: z.coerce.number().nonnegative().optional(),
    owner_department: z.string().optional(),
    status: toolStatusSchema,
    website_url: z.string().optional(),
    active_users_count: z.coerce.number().nonnegative(),
    icon_url: z.string().optional(),
    created_at: isoDateTimeSchema.optional(),
    updated_at: isoDateTimeSchema.optional(),
});

export type ToolDto = z.infer<typeof toolDtoSchema>;

export const toolListSchema = z.array(z.unknown()).transform((items): ToolDto[] => {
    return items.reduce<ToolDto[]>((acc, item) => {
        const parsed = toolDtoSchema.safeParse(item);
        if (parsed.success) acc.push(parsed.data);
        return acc;
    }, []);
});

export const toolInputSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    vendor: z.string().optional(),
    category: z.string().optional(),
    owner_department: z.string().optional(),
    status: toolStatusSchema,
    monthly_cost: z.number('Monthly cost is required').nonnegative('Monthly cost must be positive'),
    active_users_count: z.number('User count is required').int('Must be a whole number').nonnegative('User count must be positive'),
    website_url: z.union([z.literal(''), z.url('Invalid URL')]).optional(),
    icon_url: z.union([z.literal(''), z.url('Invalid URL')]).optional(),
    description: z.string().optional(),
});

export type ToolInput = z.infer<typeof toolInputSchema>;
