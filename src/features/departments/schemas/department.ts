import { z } from 'zod';
import { idSchema, isoDateTimeSchema, nonEmptyStringSchema } from '@/shared/schemas/commonSchemas';

export const departmentDtoSchema = z.object({
    id: idSchema,
    name: nonEmptyStringSchema,
    description: z.string(),
    created_at: isoDateTimeSchema,
    updated_at: isoDateTimeSchema,
});

export type DepartmentDto = z.infer<typeof departmentDtoSchema>;
