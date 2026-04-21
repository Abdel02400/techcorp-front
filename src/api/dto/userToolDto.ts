import { z } from 'zod';
import { idSchema, isoDateTimeSchema } from '@/validators/commonSchemas';
import { proficiencyLevelSchema, usageFrequencySchema } from '@/validators/enums';

export const userToolDtoSchema = z.object({
    user_id: idSchema,
    tool_id: idSchema,
    usage_frequency: usageFrequencySchema,
    last_used: isoDateTimeSchema,
    proficiency_level: proficiencyLevelSchema,
});

export type UserToolDto = z.infer<typeof userToolDtoSchema>;
