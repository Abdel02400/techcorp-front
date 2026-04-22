import { z } from 'zod';

export const usageFrequencySchema = z.enum(['daily', 'weekly', 'monthly', 'rarely']);
export type UsageFrequency = z.infer<typeof usageFrequencySchema>;

export const proficiencyLevelSchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);
export type ProficiencyLevel = z.infer<typeof proficiencyLevelSchema>;
