import type { Route } from 'next';
import type { PathOptions, RoutesMap, RouterHelpers } from './types';

const PARAM_REGEX_GLOBAL = /\{(\w+)\}/g;
const PARAM_REGEX = /\{\w+\}/;

const routeHasParams = (route: string): boolean => PARAM_REGEX.test(route);

const extractParams = (route: string): string[] => {
    return [...route.matchAll(PARAM_REGEX_GLOBAL)].map(([, param]) => param);
};

const replaceRouteParams = (route: string, params: string[], options: PathOptions, replaceParams: boolean): string => {
    return params.reduce((acc, param) => {
        const value = options[param];
        if (replaceParams && value === undefined) throw new Error(`Missing parameter "${param}" for route`);
        return acc.replace(`{${param}}`, replaceParams ? String(value) : `:${param}`);
    }, route);
};

const appendQueryParams = (route: string, options: PathOptions, params: string[]): string => {
    const query = Object.entries(options)
        .filter(([key, value]) => !params.includes(key) && value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join('&');
    return query ? `${route}?${query}` : route;
};

export const createRouter = <TRoutes extends RoutesMap>(routes: TRoutes): RouterHelpers<TRoutes> => {
    const pathImpl = (routeName: keyof TRoutes, options: PathOptions = {}, replaceParams = true): Route => {
        const route = routes[routeName]?.path;
        if (!route) throw new Error(`No route found for "${String(routeName)}"`);

        if (!routeHasParams(route)) return appendQueryParams(route, options, []) as Route;

        const params = extractParams(route);
        const replaced = replaceRouteParams(route, params, options, replaceParams);
        return appendQueryParams(replaced, options, params) as Route;
    };

    return { path: pathImpl as RouterHelpers<TRoutes>['path'] };
};
