import type { Route } from 'next';

export type PathOptions = Record<string, string | number | boolean>;

export interface NavMeta {
    label: string;
}

// A static route that Next resolves directly; can appear in the header navigation
type StaticRouteConfig = { path: Route; nav?: NavMeta };

// A dynamic route with `{param}` placeholders; cannot appear in the header nav (would need concrete param values)
type DynamicRouteConfig = { path: `${string}{${string}}${string}`; nav?: never };

export type RouteConfig = StaticRouteConfig | DynamicRouteConfig;

export type RoutesMap = Record<string, RouteConfig>;

// Extracts `{param}` names from a route template into a union of literals
type ExtractParams<S extends string> = S extends `${string}{${infer P}}${infer Rest}` ? P | ExtractParams<Rest> : never;

// Required options for a given route: the `{param}` placeholders it declares, plus any extra query params
type OptionsFor<T extends RoutesMap, K extends keyof T> = ExtractParams<T[K]['path']> extends never ? PathOptions | undefined : Record<ExtractParams<T[K]['path']>, string | number> & PathOptions;

export interface RouterHelpers<TRoutes extends RoutesMap> {
    path: <K extends keyof TRoutes>(routeName: K, options?: OptionsFor<TRoutes, K>, replaceParams?: boolean) => Route;
}
