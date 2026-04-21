import { z } from 'zod';
import { idSchema, isoDateTimeSchema, nonEmptyStringSchema, nonNegativeNumberSchema, urlSchema } from '@/validators/commonSchemas';
import { toolStatusSchema } from '@/validators/enums';

export const toolDtoSchema = z.object({
    id: idSchema,
    name: nonEmptyStringSchema,
    description: z.string(),
    vendor: nonEmptyStringSchema,
    category: nonEmptyStringSchema,
    monthly_cost: nonNegativeNumberSchema,
    previous_month_cost: nonNegativeNumberSchema,
    owner_department: nonEmptyStringSchema,
    status: toolStatusSchema,
    website_url: urlSchema,
    active_users_count: nonNegativeNumberSchema,
    icon_url: z.string(),
    created_at: isoDateTimeSchema,
    updated_at: isoDateTimeSchema,
});

export type ToolDto = z.infer<typeof toolDtoSchema>;
