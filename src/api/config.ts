const envApiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!envApiUrl) throw new Error('NEXT_PUBLIC_API_URL is not defined. Duplicate .env.local.example to .env.local and fill in the value.');

export const apiBaseUrl = envApiUrl;
