# TechCorp — Internal Tools Dashboard

Application de monitoring et de gestion des outils SaaS internes, développée dans le cadre d'un test technique frontend sur 3 jours. L'app est structurée en 3 pages (Dashboard, Tools, Analytics) avec un design system cohérent et responsive.

---

## Stack

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-base--nova-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.99-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-443E38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Zod](https://img.shields.io/badge/Zod-4.3-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![next-themes](https://img.shields.io/badge/next--themes-0.4.6-000000?style=for-the-badge)](https://github.com/pacocoursey/next-themes)
[![Lucide](https://img.shields.io/badge/Lucide-icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.39-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.8-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![pnpm](https://img.shields.io/badge/pnpm-8.6-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

---

## Quick Start

Prérequis : Node.js >= 20.9 et pnpm.

```bash
pnpm install
cp .env.local.example .env.local   # dupliquer et ajuster si besoin
pnpm dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Le fichier `.env.local` (git-ignoré) est requis au lancement. Le fichier `.env.local.example` (committé) sert de template — duplique-le en `.env.local` et adapte les valeurs si nécessaire.

| Variable              | Description                               | Valeur par défaut                         |
| --------------------- | ----------------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL de base du JSON server des ressources | `https://tt-jsonserver-01.alt-tools.tech` |

> Toutes les variables préfixées `NEXT_PUBLIC_` sont inlinées dans le bundle client au build — aucune valeur sensible ne doit y figurer.

## Scripts disponibles

| Script              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `pnpm dev`          | Démarre le serveur de développement (Turbopack)              |
| `pnpm build`        | Génère le bundle de production                               |
| `pnpm start`        | Lance le bundle de production                                |
| `pnpm lint`         | Exécute ESLint                                               |
| `pnpm lint:fix`     | Exécute ESLint et corrige automatiquement ce qui peut l'être |
| `pnpm format`       | Reformate l'ensemble du projet avec Prettier                 |
| `pnpm format:check` | Vérifie la conformité du formatage sans modifier             |

## Stack détaillée

### Framework & langage

- **Next.js 16** (App Router, Turbopack par défaut) — routing file-based, React Server Components, Async Request APIs
- **React 19.2** — dernière version stable, couplée à Next 16
- **TypeScript 5.9** avec `strict: true`

### Styling & UI

- **Tailwind CSS v4** — config en CSS-first via `@theme inline` dans `src/app/globals.css`, détection de content automatique, PostCSS plugin `@tailwindcss/postcss`
- **shadcn/ui** (preset `base-nova`, base color `neutral`, icônes Lucide) — composants copiés dans [src/components/ui/](src/components/ui/), entièrement modifiables. Basé sur Base UI (successeur de Radix) pour l'accessibilité
- **tw-animate-css** — utilitaires d'animation compatibles Tailwind v4
- **class-variance-authority** + **clsx** + **tailwind-merge** — composition de classes via l'utilitaire `cn()` dans [src/lib/utils.ts](src/lib/utils.ts)

### Data & state management

- **TanStack Query v5** — gestion du _server state_ (cache, loading/error, invalidation, refetch) pour toutes les données venant du JSON server
- **Zustand v5** — gestion du _client state_ (filtres UI, modales, sélections pour bulk actions, thème)
- **Zod v4** — validation runtime des réponses API + inférence des types TypeScript

### Theming

- **next-themes** — toggle dark/light avec persistance localStorage, support du mode `system` (sync avec la préférence OS) et élimination du flash of wrong theme via un script pre-hydration

### Qualité de code

- **ESLint flat config** étendant `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript` + `eslint-config-prettier`, avec règles projet :
    - `no-console` avec `warn`/`error`/`info` autorisés
    - `@typescript-eslint/consistent-type-imports` (force `import type`)
    - `@typescript-eslint/no-unused-vars` avec `argsIgnorePattern: '^_'`
    - `prefer-destructuring` sur les AssignmentExpressions
- **Prettier 3** — config : `singleQuote`, `semi`, `tabWidth: 4`, `printWidth: 250`, `arrowParens: 'always'`

---

## Architecture

### API Layer

La couche d'accès à l'API est organisée en 4 briques : une classe de base `RequestManager`, des services typés qui l'étendent, des DTOs validés par Zod, et des validateurs partagés.

**Contrat de retour uniforme.** Chaque méthode de service retourne une `Response<T>` — discriminated union — plutôt que throw :

```ts
// src/api/http.ts
export type OkResponse<T> = { status: ResponseStatus.Ok; data: T };
export type KoResponse = { status: ResponseStatus.Ko; message?: string };
export type Response<T> = OkResponse<T> | KoResponse;
```

Côté consommateur, un simple narrow TS donne l'accès typé à la donnée :

```ts
const response = await toolsService.getRecent(8);
if (response.status === ResponseStatus.Ko) {
    /* gestion d'erreur */
}
// ici response.data: ToolDto[] — garanti par le type système
```

**`RequestManager` (abstract).** Factorise la construction d'URL (avec query params), les headers par défaut, l'appel `fetch`, la validation Zod et le wrapping `Response<T>`. Chaque service n'a plus qu'à déclarer son `basePath` et ses méthodes métier :

```ts
class ToolsService extends RequestManager {
    protected readonly basePath = '/tools';

    public async getRecent(limit = 8): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema, { params: { _sort: 'updated_at', _order: 'desc', _limit: limit } });
    }
}
export const toolsService = new ToolsService();
```

**DTOs (`src/api/dto/`).** Chaque ressource a son schéma Zod, et le type TS est inféré via `z.infer` — source de vérité unique. Les schémas composent les validateurs partagés (`idSchema`, `isoDateTimeSchema`, `urlSchema`, etc. dans [src/validators/commonSchemas.ts](src/validators/commonSchemas.ts)) et les enums de domaine (`toolStatusSchema`, `usageFrequencySchema`, `proficiencyLevelSchema` dans [src/validators/enums.ts](src/validators/enums.ts)).

Services disponibles : `toolsService`, `usersService`, `departmentsService`, `userToolsService`, `analyticsService`.

### Data Fetching Strategy — SSR + Streaming + Suspense

Ce projet utilise le pattern officiel TanStack Query × Next App Router pour maximiser le rendu initial :

1. **Prefetch serveur.** Chaque Server Component qui dépend de données lance `queryClient.prefetchQuery(toolsQueries.recent(8))` **sans l'await** — le fetch démarre au début du render, en parallèle du rendu de la page.
2. **Dehydration.** L'arbre est enveloppé dans `<HydrationBoundary state={dehydrate(queryClient)}>` — l'état TanStack Query est sérialisé et transmis au client.
3. **Suspense boundary.** Chaque zone dépendante de données est wrappée dans `<Suspense fallback={<Skeleton />}>` pour activer le streaming HTML.
4. **Consommation client.** Les Client Components consomment la data via `useSuspenseQuery(options)` (pas `useQuery`) — qui throw une promesse tant que la data n'est pas prête, ce qui déclenche le Suspense.

**Résultat UX :**

- Si le prefetch serveur **termine avant** que le shell soit entièrement streamé → la page arrive avec la data déjà peinte dans le HTML, zéro flash de loading.
- Si le prefetch est **encore en cours** quand le shell est prêt → Next streame le shell + skeleton immédiatement, puis envoie le bloc data dès que la query résout (streaming HTML progressif).
- Après hydratation, TanStack Query prend le relais côté client pour les refetch / invalidations / mutations.

**Sous le capot.** Le `QueryClient` côté serveur est instancié **par requête** via `React.cache` dans [src/lib/queryClient.ts](src/lib/queryClient.ts) — garantit qu'il n'y a pas de partage de cache entre utilisateurs en production. Côté client, un `QueryClient` dédié est instancié une seule fois via `useState` dans [AppProviders](src/providers/AppProviders.tsx). Les deux factories partagent `QUERY_STALE_TIME_MS` comme source de vérité pour la durée de fraîcheur.

**Query options partagées (`src/queries/`)**. Chaque ressource expose un namespace (`toolsQueries`, `usersQueries`, `departmentsQueries`, `userToolsQueries`, `analyticsQueries`) dont les méthodes retournent un objet `queryOptions` typé — consommable aussi bien côté serveur que côté client :

```ts
// src/queries/toolsQueries.ts
export const toolsQueries = {
    all: () => queryOptions({ queryKey: ['tools', 'all'] as const, queryFn: async () => unwrapResponse(await toolsService.getAll()) }),
    recent: (limit = 8) => queryOptions({ queryKey: ['tools', 'recent', limit] as const, queryFn: async () => unwrapResponse(await toolsService.getRecent(limit)) }),
    // ...
};
```

Usage côté Server Component :

```tsx
const queryClient = getServerQueryClient();
void queryClient.prefetchQuery(toolsQueries.recent(8)); // fire-and-forget

return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<RecentToolsSkeleton />}>
            <RecentToolsSection />
        </Suspense>
    </HydrationBoundary>
);
```

Usage côté Client Component :

```tsx
'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { toolsQueries } from '@/queries/toolsQueries';

export const RecentToolsSection = () => {
    const { data } = useSuspenseQuery(toolsQueries.recent(8));
    return <ToolsTable tools={data} />;
};
```

L'adaptateur [src/queries/unwrapResponse.ts](src/queries/unwrapResponse.ts) convertit le contrat `Response<T>` de nos services (qui ne throw pas) en une valeur `T` ou un `throw` — indispensable parce que TanStack Query attend le protocole throw pour remplir ses états `error` / `isError`.

**Query keys hiérarchiques.** Format `[resource, scope?, ...params]` — permet des invalidations ciblées : `queryClient.invalidateQueries({ queryKey: ['tools'] })` invalide tout le scope `tools`, `{ queryKey: ['tools', 'recent'] }` uniquement les recent, etc.

---

## Structure du projet

```
src/
├── app/                     # Routes App Router
│   ├── layout.tsx           # root layout (Header + <AppProviders>)
│   ├── page.tsx             # Dashboard (/)
│   ├── tools/page.tsx       # Tools catalogue (/tools)
│   ├── analytics/page.tsx   # Analytics (/analytics)
│   ├── settings/page.tsx    # Settings (/settings)
│   └── globals.css          # Tailwind v4 @theme + tokens shadcn
├── api/                     # Couche d'accès API
│   ├── config.ts            # apiBaseUrl (lit NEXT_PUBLIC_API_URL)
│   ├── http.ts              # Response<T>, ResponseStatus
│   ├── requestManager.ts    # Classe de base abstraite
│   ├── dto/                 # Schémas Zod + types inférés par ressource
│   │   ├── toolDto.ts
│   │   ├── userDto.ts
│   │   ├── departmentDto.ts
│   │   ├── userToolDto.ts
│   │   └── analyticsDto.ts
│   └── services/            # Services typés (singletons)
│       ├── toolsService.ts
│       ├── usersService.ts
│       ├── departmentsService.ts
│       ├── userToolsService.ts
│       └── analyticsService.ts
├── validators/              # Schémas Zod partagés
│   ├── commonSchemas.ts     # id, isoDate, url, email, nonNegativeNumber, ...
│   └── enums.ts             # toolStatus, usageFrequency, proficiencyLevel
├── queries/                 # Query options TanStack (server + client)
│   ├── unwrapResponse.ts    # Adaptateur Response<T> → T (throw sur Ko)
│   ├── toolsQueries.ts
│   ├── usersQueries.ts
│   ├── departmentsQueries.ts
│   ├── userToolsQueries.ts
│   └── analyticsQueries.ts
├── components/
│   ├── ui/                  # Composants shadcn (Button, Input, DropdownMenu, Sheet, Avatar, Separator, Card, Skeleton, Table, Select, Dialog, Label, Textarea, Sonner, Chart)
│   ├── layout/              # Shell applicatif partagé (Header, HeaderSearch, Navigation, ThemeToggle, UserMenu, MobileMenu, BrandMark)
│   ├── common/              # Composants transverses (ComingSoon, StatusBadge, ToolIcon)
│   ├── dashboard/           # KpiCard, KpisSection, KpisSkeleton, RecentToolsSection, RecentToolsTable, RecentToolsSkeleton
│   ├── tools/               # ToolsTable, ToolsSkeleton, ToolsFilters, ToolsFiltersSkeleton, ToolForm, ToolFormDialog, DeleteToolDialog, ToolActionsDropdown, AddToolButton
│   └── analytics/           # BudgetOverviewCard, DepartmentCostChart, StatusDistributionChart, TopExpensiveToolsChart, AnalyticsSkeleton
├── hooks/                   # Hooks non-data
│   ├── useMounted.ts        # Guard d'hydratation (useSyncExternalStore)
│   └── useToolMutations.ts  # useCreateTool / useUpdateTool / useDeleteTool / useToggleToolStatus
├── lib/
│   ├── brand.ts             # BRAND (name, productName, tagline)
│   ├── env.ts               # isDev / isProd / isTest (tree-shakés au build)
│   ├── fonts.ts             # Police Inter (liée à --font-sans)
│   ├── format.ts            # formatCurrency, formatCurrencyCompact, formatRelativeTime
│   ├── metadata.ts          # rootMetadata
│   ├── queryClient.ts       # Factories serveur/client + QUERY_STALE_TIME_MS + getServerQueryClient (React.cache)
│   └── utils.ts             # Helper cn()
└── providers/
    └── AppProviders.tsx     # ThemeProvider + QueryClientProvider + Devtools
```

> La structure va encore s'étoffer : `components/analytics/` au Jour 8.

---

## API back-end

Les données proviennent d'un JSON server mis à disposition :

- **Base URL** : `https://tt-jsonserver-01.alt-tools.tech/`
- Ressources : `/departments`, `/users`, `/tools`, `/user_tools`, `/analytics`
- Query params json-server : `_sort`, `_order`, `_limit`, `_page`, `_embed`, et les filtres `?status=`, `?name_like=`, etc.

---

## Roadmap

- [x] **Jour 0 — Setup** : scaffold Next 16, stack complète, tooling (ESLint + Prettier)
- [x] **Jour 0 — Foundation (providers)** : `AppProviders` (next-themes + TanStack Query + Devtools), layout root avec `suppressHydrationWarning`, configuration `NEXT_PUBLIC_API_URL`, police Inter, constante `BRAND`
- [x] **Jour 0 — Foundation (API layer)** : `RequestManager`, 5 DTOs, 5 services (`toolsService`, `usersService`, `departmentsService`, `userToolsService`, `analyticsService`), validators Zod génériques + enums de domaine, factory `getServerQueryClient` per-request
- [x] **Jour 0 — Foundation (query options)** : `src/queries/*` — 5 namespaces de query options partagées serveur/client (`toolsQueries`, `usersQueries`, `departmentsQueries`, `userToolsQueries`, `analyticsQueries`), consommables via `prefetchQuery` (serveur) et `useSuspenseQuery` (client) ; adaptateur `unwrapResponse` qui convertit `Response<T>` en throw pour rester compatible avec le protocole d'erreur TanStack Query
- [x] **Jour 6 — Shell applicatif** : `Header` partagé avec `BrandMark`, `Navigation` (4 items + état actif via `usePathname`), search bar, `ThemeToggle` (Light / Dark / System via next-themes, guardé par `useMounted`/`useSyncExternalStore`), notifications, lien settings, `UserMenu` (avatar + dropdown), `MobileMenu` (drawer Sheet) ; pages stub `ComingSoon` pour /tools, /analytics, /settings
- [x] **Jour 6 — Dashboard KPIs** : 4 KPI cards (Monthly Budget, Active Tools, Departments, Cost / User) alimentés par 3 queries parallèles (`analyticsQueries.get`, `toolsQueries.all`, `departmentsQueries.all`), prefetch serveur + `HydrationBoundary` + `<Suspense fallback={<KpisSkeleton />}>`, formatage via `formatCurrency` / `formatCurrencyCompact`. `toolDtoSchema` rendu défensif (coerce sur les champs numériques) + parser de liste tolérant qui drop silencieusement les items malformés (la vraie data du JSON server a des incohérences : `active_users_count` tantôt string tantôt number, `monthly_cost` parfois absent, etc.)
- [x] **Jour 6 — Recent Tools** : table 5 colonnes (Tool + icône, Department, Users, Monthly Cost, Status) alimentée par `toolsQueries.recent(8)`, `<Suspense>` dédiée à l'intérieur de la `Card` (header "Recent Tools" + "Last 30 days" toujours visible pendant le loading), fallback skeleton mimant la vraie table, `StatusBadge` réutilisable (3 variantes gradient : active / expiring / unused), `ToolIcon` qui tente `<img>` puis bascule sur l'initiale via `onError`. Alignement numérique via `tabular-nums`, responsive via l'`overflow-x-auto` natif de la Table shadcn. **Stratégie d'over-fetch** dans `toolsService.getRecent` : le service demande `limit * 4` à l'API puis slice top `limit` après validation Zod, parce que les plus récents tools contiennent beaucoup de junk/test data (status en majuscule, champs manquants) qui se fait drop par le parser tolérant — sans cet over-fetch on afficherait seulement 2-3 tools valides.
- [x] **Jour 7 — Tools catalog (display)** : page `/tools` avec table 8 colonnes (Tool + icon + description, Category, Department, Users, Monthly Cost, Last updated relative, Status, Actions placeholder), prefetch serveur `toolsQueries.all` + `HydrationBoundary` + `<Suspense>` avec skeleton dédié, filtrage client-side par nom/description/vendor via `useSearchParams('search')`, wrapper `Card` avec `px-6 py-4` pour l'alignement. Search bar du header refactorée en `HeaderSearch` : client component qui lit/écrit le query param `?search=` avec debounce 300ms, activée uniquement sur `/tools` (disabled ailleurs, placeholder adaptatif), wrappée dans une `<Suspense>` dans le Header pour permettre la prerender statique des autres routes.
- [x] **Jour 7 — Tools filters** : toolbar au-dessus de la table, 3 dropdowns (`Department`, `Status`, `Category` — options Department/Category dérivées des `owner_department` / `category` uniques des tools, `sort()` alphabétique) + range Min/Max Cost en deux `<Input type="number">`. Tout l'état est URL-backed (`?department=...&status=...&category=...&min_cost=100&max_cost=500`). Bouton `Clear filters` qui apparaît conditionnellement et preserve `?search=` (c'est de la recherche, pas un filtre). Filtres appliqués dans `ToolsTable.tsx` via un `useMemo` unique qui combine recherche + dropdowns + range. Skeleton dédié (`ToolsFiltersSkeleton`) dans la même `<Card>` que la table, séparés par une bordure.
- [x] **Jour 7 — Tools management (CRUD per-row)** : bouton "Add Tool" dans le header de page ouvre un `<Dialog>` avec `ToolForm` (react-hook-form + `standardSchemaResolver` sur `toolInputSchema` — standard-schema path parce que `zodResolver` galère avec Zod 4.3.x internal version bump). Chaque ligne expose un `ToolActionsDropdown` : **Edit** ré-ouvre le même dialog pré-rempli, **Disable/Enable** toggle le status sans confirmation, **Delete** ouvre `DeleteToolDialog` avec confirmation. 4 mutations dans `useToolMutations.ts` (`useCreateTool`, `useUpdateTool`, `useDeleteTool`, `useToggleToolStatus`) qui invalident le scope `['tools']` on success et affichent un toast Sonner (success/error) selon le résultat. `<Toaster />` monté dans `AppProviders`. Schéma `toolInputSchema` + type `ToolInput` exportés du DTO.
- [ ] **Jour 7 — Tools bulk ops** (optionnel) : multi-select + bulk actions
- [x] **Jour 8 — Analytics (core)** : page `/analytics` avec 4 sections : (1) `BudgetOverviewCard` (valeur absolue + limite + progress bar gradient dont la tonalité tourne amber/rose selon l'utilisation), (2) `DepartmentCostChart` (donut Recharts, `monthly_cost` sommé par `owner_department` sur les tools actifs), (3) `StatusDistributionChart` (pie, compte active/expiring/unused avec les mêmes couleurs que `StatusBadge`), (4) `TopExpensiveToolsChart` (horizontal bar, top 10 par `monthly_cost`). Prefetch serveur (`analyticsQueries.get` + `toolsQueries.all`) + `HydrationBoundary` + `<Suspense fallback={<AnalyticsSkeleton />}>` unique qui englobe tout. Charts = **shadcn Chart** (wrapper sur Recharts) pour rester cohérent avec le design system ; tokens `--chart-1` à `--chart-5` de `globals.css` passés d'un scale grayscale à une palette OKLCH colorée (emerald / violet / orange / rose / amber), en sync light et dark mode. Tooltips et légende stylés par shadcn Chart.
- [ ] **Jour 8 — Analytics (optionnel)** : usage analytics (adoption rates, most/least used, growth trends) + insights (unused tool alerts, ROI projections) + cross-page nav (click chart segment → `/tools?status=...`)
