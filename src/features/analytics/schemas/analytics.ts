import { z } from 'zod';
import { nonNegativeNumberSchema } from '@/shared/schemas/commonSchemas';

export const analyticsDtoSchema = z.object({
    budget_overview: z.object({
        monthly_limit: nonNegativeNumberSchema,
        current_month_total: nonNegativeNumberSchema,
        previous_month_total: nonNegativeNumberSchema,
        budget_utilization: z.string(),
        trend_percentage: z.string(),
    }),
    kpi_trends: z.object({
        budget_change: z.string(),
        tools_change: z.string(),
        departments_change: z.string(),
        cost_per_user_change: z.string(),
    }),
    cost_analytics: z.object({
        cost_per_user: nonNegativeNumberSchema,
        previous_cost_per_user: nonNegativeNumberSchema,
        active_users: nonNegativeNumberSchema,
        total_users: nonNegativeNumberSchema,
    }),
});

export type AnalyticsDto = z.infer<typeof analyticsDtoSchema>;
