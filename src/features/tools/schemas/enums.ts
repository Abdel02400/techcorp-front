import { z } from 'zod';

export const toolStatusSchema = z.enum(['active', 'unused', 'expiring']);
export type ToolStatus = z.infer<typeof toolStatusSchema>;
