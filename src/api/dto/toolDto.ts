import { z } from 'zod';
import { idSchema, isoDateTimeSchema, nonEmptyStringSchema } from '@/validators/commonSchemas';
import { toolStatusSchema } from '@/validators/enums';

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
