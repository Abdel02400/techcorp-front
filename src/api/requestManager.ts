import type { z } from 'zod';
import { apiBaseUrl } from '@/api/config';
import { ResponseStatus, type Response } from '@/api/http';

type QueryParams = Record<string, string | number | boolean>;

abstract class RequestManager {
    protected abstract readonly basePath: string;

    protected getDefaultHeaders(): Headers {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    protected buildUrl(path: string, params?: QueryParams): string {
        const url = new URL(`${apiBaseUrl}${this.basePath}${path}`);
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.append(key, String(value));
            }
        }
        return url.toString();
    }

    protected async request<TSchema extends z.ZodTypeAny>(path: string, schema: TSchema, init?: RequestInit & { params?: QueryParams }): Promise<Response<z.infer<TSchema>>> {
        try {
            const { params, ...fetchInit } = init ?? {};
            const url = this.buildUrl(path, params);
            const request = await fetch(url, {
                headers: this.getDefaultHeaders(),
                ...fetchInit,
            });

            if (!request.ok) return { status: ResponseStatus.Ko, message: `HTTP ${request.status}` };

            const text = await request.text();
            const json = text ? JSON.parse(text) : null;
            const parsed = schema.safeParse(json);
            if (!parsed.success) return { status: ResponseStatus.Ko, message: `Invalid response shape: ${parsed.error.issues.map((issue) => `${issue.path.join('.')} ${issue.message}`).join('; ')}` };

            return { status: ResponseStatus.Ok, data: parsed.data };
        } catch {
            return { status: ResponseStatus.Ko };
        }
    }
}

export default RequestManager;
