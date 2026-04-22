import { z } from 'zod';
import { dateStringSchema, emailSchema, idSchema, nonEmptyStringSchema } from '@/shared/schemas/commonSchemas';

export const userDtoSchema = z.object({
    id: idSchema,
    name: nonEmptyStringSchema,
    email: emailSchema,
    department_id: idSchema,
    role: nonEmptyStringSchema,
    active: z.boolean(),
    joined_at: dateStringSchema,
});

export type UserDto = z.infer<typeof userDtoSchema>;
