# TechCorp — Internal Tools Dashboard

Application de monitoring et de gestion des outils SaaS internes, développée dans le cadre d'un test technique frontend sur 3 jours. L'app est structurée en 3 pages (Dashboard, Tools, Analytics) avec un design system cohérent, un data layer typé de bout en bout et un rendu SSR + streaming.

---

## Stack

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-base--nova-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.99-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Recharts](https://img.shields.io/badge/Recharts-3.8-22B5BF?style=for-the-badge)](https://recharts.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-443E38?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Zod](https://img.shields.io/badge/Zod-4.3-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.73-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
[![next-themes](https://img.shields.io/badge/next--themes-0.4.6-000000?style=for-the-badge)](https://github.com/pacocoursey/next-themes)
[![Lucide](https://img.shields.io/badge/Lucide-icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.39-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.8-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)](https://prettier.io/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

---

## 🚀 Quick Start

Prérequis : Node.js >= 20.9 et pnpm.

```bash
pnpm install
cp .env.local.example .env.local   # dupliquer et ajuster si besoin
pnpm dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

### Variables d'environnement

Le fichier `.env.local` (git-ignoré) est requis au lancement. Le fichier `.env.local.example` (committé) sert de template — duplique-le en `.env.local` et adapte les valeurs si nécessaire.

| Variable              | Description                               | Valeur par défaut                         |
| --------------------- | ----------------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_API_URL` | URL de base du JSON server des ressources | `https://tt-jsonserver-01.alt-tools.tech` |

> Toutes les variables préfixées `NEXT_PUBLIC_` sont inlinées dans le bundle client au build — aucune valeur sensible ne doit y figurer. [src/shared/api/config.ts](src/shared/api/config.ts) throw explicitement au chargement du module si la variable manque — fail-fast, pas de dégradation silencieuse.

### Scripts disponibles

| Script              | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `pnpm dev`          | Démarre le serveur de développement (Turbopack)              |
| `pnpm build`        | Génère le bundle de production                               |
| `pnpm start`        | Lance le bundle de production                                |
| `pnpm lint`         | Exécute ESLint                                               |
| `pnpm lint:fix`     | Exécute ESLint et corrige automatiquement ce qui peut l'être |
| `pnpm format`       | Reformate l'ensemble du projet avec Prettier                 |
| `pnpm format:check` | Vérifie la conformité du formatage sans modifier             |

---

## 🏗️ Architecture

### Les 3 pages

- **`/` — Dashboard** : vue macro. 4 KPI cards (budget, active tools, departments, cost/user) + table des 8 outils récemment modifiés.
- **`/tools` — Tools Catalogue** : vue opérationnelle. Catalogue filtrable (recherche + 4 dropdowns + cost range, tout URL-backed), CRUD per-row (Add / Edit / Toggle status / Delete) via dialogs et mutations TanStack Query.
- **`/analytics` — Analytics** : vue stratégique. Budget health + breakdown par département (donut) + distribution de statut (pie) + top 10 des tools par coût (horizontal bar).

### Structure du projet

L'architecture suit un pattern **feature-first** (vertical slices) : chaque domaine métier possède sa propre stack complète (api + components + hooks + queries + schemas), et un dossier `shared/` contient le code réellement transverse. C'est le modèle adopté par l'écosystème Next moderne (Epic Stack, bulletproof-react, Vercel templates).

```
src/
├── app/                          # Next routing (thin layer)
│   ├── layout.tsx                # root layout (Header + <AppProviders>)
│   ├── page.tsx                  # Dashboard (/)
│   ├── tools/page.tsx            # Tools catalogue (/tools)
│   ├── analytics/page.tsx        # Analytics (/analytics)
│   ├── error.tsx                 # Error boundary global
│   ├── not-found.tsx             # 404 branded
│   ├── icon.tsx                  # Favicon dynamique via next/og
│   └── globals.css               # Tailwind v4 @theme inline + tokens shadcn
│
├── features/                     # Business code par domaine (vertical slices)
│   ├── tools/
│   │   ├── api/
│   │   │   └── toolsService.ts   # extends RequestManager, CRUD + filters
│   │   ├── components/           # atomes (StatusBadge, ToolIcon, KpiCard), dialogs (ToolFormDialog, DeleteToolDialog, ToolForm), actions (AddToolButton, ToolActionsDropdown) + 2 blocs data-fetching en dossiers dédiés :
│   │   │   ├── ToolsFilters/
│   │   │   │   ├── ToolsFilters.tsx         # wrapper Block + skeleton
│   │   │   │   └── components/{ToolsFiltersContent, ToolsFiltersSkeleton}.tsx
│   │   │   └── ToolsTable/
│   │   │       ├── ToolsTable.tsx            # wrapper Block + skeleton
│   │   │       └── components/{ToolsTableContent, ToolsTableSkeleton}.tsx
│   │   ├── hooks/
│   │   │   └── useToolMutations.ts       # 4 mutations (create/update/delete/toggle) + Sonner toasts
│   │   ├── queries/
│   │   │   └── toolsQueries.ts   # queryOptions namespace
│   │   └── schemas/
│   │       ├── tool.ts           # toolDtoSchema + toolListSchema (tolerant) + toolInputSchema + ToolDto/ToolInput
│   │       └── enums.ts          # toolStatusSchema + ToolStatus
│   ├── analytics/
│   │   ├── api/analyticsService.ts
│   │   ├── components/           # 4 blocs en dossiers dédiés, chacun avec wrapper (ErrorBoundary + Suspense) + Header + Content + Skeleton :
│   │   │   ├── BudgetOverviewCard/{BudgetOverviewCard.tsx, components/{Header,Content,Skeleton}.tsx}
│   │   │   ├── DepartmentCostChart/{...}
│   │   │   ├── StatusDistributionChart/{...}
│   │   │   └── TopExpensiveToolsChart/{...}
│   │   ├── queries/analyticsQueries.ts
│   │   └── schemas/analytics.ts
│   ├── dashboard/
│   │   └── components/
│   │       ├── KpiCard.tsx                  # atom (props only, pas de fetch) — réutilisable
│   │       ├── KpisSection/                 # bloc data-fetching (3 queries en parallèle via useSuspenseQueries), Block + Skeleton
│   │       │   ├── KpisSection.tsx
│   │       │   └── components/{KpisContent, KpisSkeleton}.tsx
│   │       └── RecentToolsSection/          # bloc data-fetching (1 query), Card custom + Block + Header/Content/Skeleton (table avec sort + pagination 10/page)
│   │           ├── RecentToolsSection.tsx
│   │           └── components/{RecentToolsHeader, RecentToolsContent, RecentToolsSkeleton}.tsx
│   ├── departments/
│   │   ├── api/departmentsService.ts
│   │   ├── queries/departmentsQueries.ts
│   │   └── schemas/department.ts
│   ├── users/
│   │   ├── api/usersService.ts
│   │   ├── queries/usersQueries.ts
│   │   └── schemas/user.ts
│   └── user-tools/
│       ├── api/userToolsService.ts
│       ├── queries/userToolsQueries.ts
│       └── schemas/
│           ├── userTool.ts
│           └── enums.ts          # usageFrequency + proficiencyLevel
│
├── shared/                       # code cross-feature (2+ consommateurs)
│   ├── api/
│   │   ├── config.ts             # apiBaseUrl (NEXT_PUBLIC_API_URL)
│   │   ├── resources.ts          # registry central des ressources API (single source) — chaque entrée expose `.key` (pour query keys) + `.endpoint` (pour URL paths)
│   │   ├── http.ts               # Response<T>, ResponseStatus
│   │   └── requestManager.ts     # classe abstraite
│   ├── components/
│   │   ├── ui/                   # shadcn primitives (Button, Input, Card, Dialog, Table, Chart, Drawer, Skeleton, ...)
│   │   ├── Logo.tsx              # logo partagé (BrandMark + favicon dynamique via next/og)
│   │   ├── NavLink.tsx           # Link Next + aria-current automatique, cva variants pill / tab
│   │   ├── SearchInput.tsx       # search input shared (Suspense + Skeleton + clear + submit-on-Enter)
│   │   ├── Block.tsx             # ErrorBoundary + QueryErrorResetBoundary + Suspense (slots skeleton/children) — pour blocs hors Card
│   │   ├── BlockCard.tsx         # Card + header + Block (CardContent wrapping autour du retry) — pour blocs dans une Card
│   │   ├── BlockRetry.tsx        # UI de retry partagée pour les ErrorBoundary block-level
│   │   └── typography.tsx        # Heading + Text avec variants cva (single source of truth typo)
│   ├── hooks/
│   │   ├── useMounted.ts         # guard d'hydratation (useSyncExternalStore)
│   │   └── useSearchParam.ts     # URL sync (value/setValue/commit/clear) + useOptimistic anti-flash
│   ├── layout/                   # Shell app — Header (desktop) + BottomTabBar (mobile/tablet)
│   │   ├── Header/
│   │   │   ├── Header.tsx        # composition minimaliste, visible partout mais contenu condensé <lg:
│   │   │   └── components/
│   │   │       ├── BrandMark.tsx         # logo + brand name (Link vers home)
│   │   │       ├── Navigation.tsx        # nav horizontale (NavLink variant="pill") visible lg+ seulement
│   │   │       └── HeaderActions/
│   │   │           ├── HeaderActions.tsx
│   │   │           └── components/
│   │   │               ├── ThemeToggle.tsx       # dropdown Light/Dark/System + Skeleton pre-hydration
│   │   │               ├── UserMenu.tsx          # avatar + dropdown
│   │   │               └── NotificationsButton.tsx
│   │   └── BottomTabBar/         # nav mobile/tablet <lg:, fixe en bas de viewport
│   │       ├── BottomTabBar.tsx  # 3 items nav (NavLink variant="tab") + bouton loupe search
│   │       └── components/
│   │           └── SearchSheet.tsx        # Drawer vaul qui monte conditionnellement <SearchInput autoFocus />
│   ├── lib/
│   │   ├── format.ts             # formatCurrency / formatCurrencyCompact / formatRelativeTime + constantes locales (MS_PER_DAY, DAYS_PER_MONTH, ...)
│   │   ├── queryClient.ts        # factories serveur/client + QUERY_STALE_TIME_MS + getServerQueryClient
│   │   └── utils.ts              # cn() helper
│   ├── providers/
│   │   └── AppProviders.tsx      # ThemeProvider + QueryClientProvider + Toaster + Devtools
│   ├── queries/
│   │   ├── buildKey.ts           # helper `<const>` generic qui construit un tuple readonly sans `as const` au call site
│   │   └── unwrapResponse.ts     # adapters : unwrapResponse (sync) + unwrap (promise chaining pour queryFn)
│   ├── router/                   # Router typé + registry de routes
│   │   ├── types.ts              # RouteConfig (discriminated union static/dynamic), NavMeta, ExtractParams
│   │   ├── routes.ts             # Map des routes de l'app avec nav metadata
│   │   ├── createRouter.ts       # Factory : path(name, options?) validé + query params
│   │   └── index.ts              # Exporte `path()` + `navEntries` dérivé du map
│   └── schemas/
│       └── commonSchemas.ts      # primitives Zod génériques (idSchema, urlSchema, emailSchema, isoDateTimeSchema, ...)
│
└── config/                       # configuration statique
    ├── actionKeys.ts             # map de keyboard keys (ENTER, ...) pour éviter les string literals
    ├── brand.ts                  # BRAND { name, productName, tagline }
    ├── env.ts                    # isDev / isProd / isTest (tree-shaken au build)
    ├── fonts.ts                  # Inter (liée à --font-sans)
    ├── i18n.ts                   # DEFAULT_LOCALE + DEFAULT_CURRENCY (prêt pour i18n futur)
    └── metadata.ts               # rootMetadata (titre, description)
```

### Règles de dépendance (visées, non enforced pour l'instant)

- `config/` ne dépend de rien (pure data)
- `shared/` peut dépendre de `config/` uniquement — jamais de `features/`
- `features/<a>/` peut dépendre de `shared/`, `config/`, et d'autres `features/<b>/` **si la dépendance est logique** (ex : `features/analytics` dépend de `features/tools` pour réutiliser `StatusBadge`/`ToolIcon`). Une règle ESLint `import/no-restricted-paths` pourra être ajoutée plus tard pour formaliser ce graphe.
- `app/` est l'assembleur final, importe tout ce dont il a besoin.

### API Layer

Contrat de retour uniforme — chaque méthode de service retourne une `Response<T>` (discriminated union), **ne throw jamais** :

```ts
// src/shared/api/http.ts
export type OkResponse<T> = { status: ResponseStatus.Ok; data: T };
export type KoResponse = { status: ResponseStatus.Ko; message?: string };
export type Response<T> = OkResponse<T> | KoResponse;
```

`RequestManager` (abstract) factorise la construction d'URL avec query params, les headers par défaut, l'appel `fetch`, le safeParse Zod et le wrapping `Response<T>`. Les services concrets étendent cette classe et ne déclarent que leur `basePath` (pioché dans `resources`) + leurs méthodes métier.

**Single source of truth** — `resources.ts` regroupe le nom de chaque ressource API une seule fois, et expose deux facettes dérivées :

```ts
// src/shared/api/resources.ts
const define = <const T extends string>(name: T): { key: T; endpoint: `/${T}` } => ({
    key: name,
    endpoint: `/${name}`,
});

export const resources = {
    analytics: define('analytics'),
    departments: define('departments'),
    tools: define('tools'),
    users: define('users'),
    userTools: define('user_tools'),
};
```

- `resources.tools.endpoint` → `'/tools'` (URL path, utilisé par les services)
- `resources.tools.key` → `'tools'` (racine de query key, utilisée par les queries TanStack)

Les types littéraux sont préservés via un `<const>` generic sur `define` + template literal type `` `/${T}` `` pour l'endpoint. Pas de `as const` à maintenir.

```ts
// src/features/tools/api/toolsService.ts
class ToolsService extends RequestManager {
    protected readonly basePath = resources.tools.endpoint;

    public async getRecent(limit = 8): Promise<Response<ToolDto[]>> {
        return this.request('', toolListSchema, { params: { _sort: 'updated_at', _order: 'desc', _limit: limit * 4 } });
    }
}
export const toolsService = new ToolsService();

// src/features/tools/queries/toolsQueries.ts
export const toolsQueries = {
    all: () => queryOptions({
        queryKey: buildKey(resources.tools.key, 'all'),    // readonly ['tools', 'all']
        queryFn: () => unwrap(toolsService.getAll()),
    }),
    ...
};
```

Si l'API JSON server renomme une ressource (ex: `/user_tools` → `/user-tools`), **1 seule ligne à changer** dans `resources.ts` — services ET query keys répercutent. `buildKey` (dans `shared/queries/buildKey.ts`) est un wrapper générique `<const>` qui capture le tuple readonly sans avoir à écrire `as const` au call site.

Côté consommateur, un narrow TS donne l'accès typé sans effort :

```ts
const response = await toolsService.getRecent(8);
if (response.status === ResponseStatus.Ko) return; // gestion d'erreur
// ici response.data: ToolDto[] — garanti par le type système
```

---

## 🔗 Navigation & User Journey

Le parcours utilisateur cible est l'**admin IT** qui arrive sur le Dashboard depuis une notification ou un lien mail, repère un outil préoccupant (budget tight, tool expiring), bascule sur Tools pour investiguer et agir, puis va sur Analytics pour mesurer l'impact financier global.

**Trois routes principales reliées par un Header sticky partagé :**

1. **Dashboard (`/`) — landing / vue macro** — atterrissage par défaut. Réponse en un coup d'œil à "où en est-on ce mois ?".
2. **Tools (`/tools`) — vue opérationnelle** — catalogue complet filtrable. L'état des filtres vit dans l'URL (`/tools?status=expiring&min_cost=500`) ce qui rend chaque vue **shareable** (un admin peut envoyer ce lien à un collègue) et **deep-linkable** (la Dashboard peut linker directement vers la vue filtrée appropriée).
3. **Analytics (`/analytics`) — vue stratégique** — revue mensuelle ou trimestrielle. Breakdown financier qui sert de base aux discussions budget.

**Pattern de navigation cohérent cross-page** :

- **`Header` partagé** ([src/shared/layout/Header/Header.tsx](src/shared/layout/Header/Header.tsx)) avec sticky top, backdrop blur. Sous `lg:` le header est condensé (BrandMark + HeaderActions uniquement), la nav et la search sont déléguées au tab bar.
- **Search bar contextuelle** — composant unique `<SearchInput>` ([src/shared/components/SearchInput.tsx](src/shared/components/SearchInput.tsx)) réutilisé dans le header desktop ET injecté dans le drawer mobile. Active sur `/tools` (filtre le catalogue via `?search=`), disabled ailleurs. Submit-on-Enter (pas de live-search) : URL mise à jour uniquement quand l'user valide → 1 seule requête RSC par recherche.
- **Mobile/tablet nav** (`<BottomTabBar>` sous `lg:`) — fixe en bas de viewport, 3 items nav + bouton loupe. Tap loupe → `<Drawer>` vaul se slide-up avec l'input auto-focus. Enter commit + ferme le drawer. Pattern modal standard (l'overlay bloque l'interaction avec le reste pendant que le drawer est ouvert).
- **Theme toggle** (Light / Dark / System) via `next-themes`, persisté dans localStorage et synchronisé avec la préférence OS.
- **Favicon dynamique** ([src/app/icon.tsx](src/app/icon.tsx)) généré via `next/og` — même Zap + gradient violet→indigo que le `<BrandMark>` du header, zéro binaire à maintenir.

**Navigation cross-page depuis Analytics** : les éléments des 3 charts sont cliquables et ouvrent directement la vue filtrée correspondante dans Tools :

- Slice du `DepartmentCostChart` → `/tools?department=<name>`
- Slice du `StatusDistributionChart` → `/tools?status=<status>`
- Bar du `TopExpensiveToolsChart` → `/tools?search=<tool_name>`

Cursor `pointer` et hover feedback sur chaque élément cliquable. Les segments "Unknown" (tools sans department défini) sont désactivés pour éviter des liens vides.

### Router typé (`src/shared/router/`)

Toutes les URLs de l'app passent par un **helper `path()` typé**, aucune URL hardcodée dans les composants. Combine trois mécanismes :

**1. Registry de routes** ([`routes.ts`](src/shared/router/routes.ts)) — single source of truth :

```ts
export const routes = {
    home: { path: '/', nav: { label: 'Dashboard', icon: LayoutDashboard } },
    tools: { path: '/tools', nav: { label: 'Tools', icon: Wrench } },
    analytics: { path: '/analytics', nav: { label: 'Analytics', icon: BarChart3 } },
} satisfies RoutesMap;
```

`NavMeta` inclut `icon: LucideIcon` — utilisé par le `<BottomTabBar>` mobile pour afficher les pictos, et disponible côté desktop si on veut plus tard enrichir la `<Navigation>`.

Les entrées qui portent une prop `nav` apparaissent dans le `Navigation` principal (dérivé à la volée via `navEntries`, ordre = ordre de déclaration). Une route "cachée" (ex: `toolDetail`, `login`) serait déclarée sans `nav` et n'apparaîtrait pas dans le header.

**2. Helper `path(name, options?)`** avec typage template literal pour les params :

```ts
path('home'); // '/'
path('tools', { status: 'active' }); // '/tools?status=active'
path('tools', { department: 'Engineering', min_cost: 500 }); // multi-params
path('toolDetail', { id: 42, tab: 'history' }); // '/tools/42?tab=history' (future)
```

Le type `ExtractParams<Template>` extrait les `{param}` du template pour forcer leur présence dans les options (TS error si un param est oublié).

**3. `typedRoutes: true`** dans [`next.config.ts`](next.config.ts) — Next génère au build un type `Route` qui est l'union de toutes les URLs valides dérivées du filesystem. Notre `path()` retourne `Route`, donc tout appel `router.push(path('tols'))` (typo) est bloqué au compile time. Filet de sécurité contre la dérive entre notre map déclarative et la structure des `app/**/page.tsx`.

**4. Union discriminée au niveau du type `RouteConfig`** — une route est soit statique (`{ path: Route; nav?: NavMeta }`) soit dynamique (`{ path: TemplateWithParam; nav?: never }`). Deux conséquences :

- Un typo dans un path statique (`'/hme'` au lieu de `'/home'`) est **bloqué à la déclaration** dans `routes.ts`, pas seulement à l'appel de `path()`
- Déclarer `nav` sur une route dynamique (ex : `toolDetail: { path: '/tools/{id}', nav: {...} }`) est un **TS error** — une route dynamique n'a pas vocation à apparaître dans le header principal sans id concret. La règle métier est encodée dans le type au lieu de vivre dans un commentaire

**Résultat concret** : 10 sites d'usage (liens header, pages error/404, charts analytics cliquables, filtres URL-backed) passent tous par `path()`. Renommer une route = 1 ligne à changer dans `routes.ts`, et TS propage.

---

## 🎨 Design System Evolution

Trois jours, un design system qui n'a pas bougé de direction. Trois choix structurants :

### Jour 6 — Foundation

Tokens posés dans `globals.css` (Tailwind v4 `@theme inline`) basés sur le preset shadcn **`base-nova`** (backed par **Base UI** — successeur de Radix — pour l'accessibilité). Base color `neutral`. Les tokens critiques (`--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--destructive`, `--border`) sont définis en light et dark. Police Inter liée à `--font-sans`. Le composant `<BrandMark>` établit l'identité visuelle (gradient violet-indigo + icône Zap de Lucide) qui est ensuite réutilisée sur le favicon dynamique (`src/app/icon.tsx`) et l'`AvatarFallback` du UserMenu.

### Jour 7 — Extension sans invention

Chaque composant custom (`StatusBadge`, `KpiCard`, `ToolIcon`, `HeaderSearch`, `ToolActionsDropdown`, etc.) construit en **composant** des primitives shadcn déjà installées (`Card`, `Input`, `Dialog`, `Table`, `Select`, `DropdownMenu`). Zéro CSS custom hors Tailwind, zéro nouveau design token inventé, zéro choix de couleur arbitraire. Le gradient des KPI cards (emerald / violet / orange / rose) est **réutilisé** dans `StatusBadge`, l'`AvatarFallback`, et la progress bar du `BudgetOverviewCard`.

### Jour 8 — Extension mesurée de la palette

Pour les charts, les tokens `--chart-1` à `--chart-5` de `globals.css` (initialement grayscale dans le preset shadcn) ont été remplacés par la même palette que les KPI cards (OKLCH : emerald / violet / orange / rose / amber), avec deux jeux de valeurs (light / dark) pour la lisibilité. Aucune couleur hardcodée dans les composants analytics — tout passe par les tokens CSS, donc un changement de palette = une modification dans `globals.css` et toutes les charts (+ toutes les autres vues qui consomment ces tokens) se mettent à jour.

### Post-J8 — Typography system

Refacto typographique pour éliminer la répétition de combinaisons de classes Tailwind (`text-3xl font-semibold tracking-tight md:text-4xl` dans 3 titres de page, `text-sm font-medium text-muted-foreground` pour plusieurs labels, etc.). Deux composants [`src/shared/components/typography.tsx`](src/shared/components/typography.tsx) exposent des variants cva :

- **`<Heading level="...">`** — 4 variants : `page` (h1 titres de page), `section` (h2 titres de section), `kpi` (valeurs KPI), `brand` (nom de brand dans le Header). Prop `as` pour séparer la sémantique HTML du style (ex : `<Heading level="section" as="h2">`, `<Heading level="brand" as="span">`).
- **`<Text variant="...">`** — 3 variants : `muted` (sous-titres, descriptions), `label` (petits labels de cards), `caption` (micro-texte). Prop `as` idem.

Pattern cva choisi plutôt que `@apply` dans `globals.css` parce que c'est la méthode Tailwind-native officiellement recommandée (Adam Wathan), cohérente avec l'existant (Button, KpiCard utilisent déjà cva), et donne le type-checking + autocomplete IDE au call-site. Zéro string Tailwind pour la typographie dans les 12 call sites migrés — un changement de taille de tous les titres de page = 1 ligne dans le cva config.

---

## 🎯 Design Consistency Approach (sans mockups J7-J8)

Les 4 principes qui ont tenu la cohérence sans maquette pour les jours 7 et 8 :

1. **La maquette J6 définit la langue, pas juste l'écran.** Grille, rythme vertical, padding interne des cards, épaisseur des gradients, radius des pills — tout est extrait et réutilisé. Chaque composant J7-J8 reprend ces valeurs, aucune valeur arbitraire.
2. **Chaque nouvelle décision doit citer un précédent.** Bouton destructive sur `DeleteToolDialog` → on reprend `variant="destructive"` shadcn. Skeleton pour la Tools table → on mime la même structure que `RecentToolsSkeleton` (headers inclus pour éviter le layout shift). Badge de status → on étend `StatusBadge` existant, on n'en crée pas un nouveau.
3. **Les composants "common" sont les vrais vecteurs de cohérence.** `StatusBadge` et `ToolIcon` dans `features/tools/components/` (réutilisés par Dashboard et Analytics), et `<Heading>` / `<Text>` dans `shared/components/typography.tsx` pour factoriser les combinaisons de classes typographiques. Extraire tôt ce qui sera réutilisé, pas tard.
4. **Quand l'API ne matche pas le mockup, on adapte la donnée, pas le design.** Le parser tolérant dans `toolListSchema` drop silencieusement les entrées mal formées plutôt que d'afficher une table criblée de "—". La stratégie d'over-fetch dans `getRecent` (`limit * 4` puis slice) compense la junk data du serveur sans afficher moins de rows que prévu. Le design reste propre, la résilience est en amont.

---

## 📊 Data Integration Strategy

### Trois couches entre l'API et le composant qui affiche

1. **Service** ([src/features/<feature>/api/](src/features/<feature>/api/)) — class extends `RequestManager`, expose les méthodes métier, retourne `Response<T>`. Stateless, testable isolément.
2. **Query options** ([src/features/<feature>/queries/](src/features/<feature>/queries/)) — `queryOptions({ queryKey, queryFn })` qui wrap le service. Partagé serveur (`prefetchQuery`) et client (`useSuspenseQuery`). `unwrapResponse` adapte `Response<T>` → `T | throw` pour être compatible avec le protocole d'erreur TanStack.
3. **Component** — `useSuspenseQuery(queries.x())` côté client, `queryClient.prefetchQuery(queries.x())` côté Server Component parent.

### SSR + Streaming + Suspense

Pattern officiel TanStack × Next App Router :

1. **Prefetch serveur** (`queryClient.prefetchQuery(...)`, **sans `await`**) — le fetch démarre au début du render, en parallèle
2. **Dehydration** via `<HydrationBoundary state={dehydrate(queryClient)}>` — l'état est sérialisé et transmis au client
3. **Suspense boundary** autour de chaque zone data-dépendante → streaming HTML progressif
4. **`useSuspenseQuery`** côté client — throw une promesse tant que la data n'est pas prête, déclenche le Suspense

**Résultat UX :**

- Prefetch serveur **termine avant** le shell → data déjà peinte dans le HTML, **zéro flash de loading**
- Prefetch **encore en cours** → shell + skeleton streamés immédiatement, bloc data arrive dès que la query résout
- Après hydratation, TanStack Query prend le relais côté client pour les mutations et refetch

### QueryClient par-request côté serveur

`QueryClient` instancié **une fois par requête** via `React.cache` dans [src/shared/lib/queryClient.ts](src/shared/lib/queryClient.ts) — garantit zéro cross-contamination entre users en prod. Côté client, un `QueryClient` unique est créé via `useState` dans `AppProviders`. Les deux factories partagent `QUERY_STALE_TIME_MS` comme source de vérité.

### Deux niveaux de défense contre la data "dirty"

Le JSON server public retourne des tools avec des incohérences (`active_users_count` tantôt string, `monthly_cost` parfois absent, `status` parfois en majuscule, entrées de test nommées "Test" avec juste un id). Notre stratégie :

- **Niveau item** (`toolDtoSchema`) : strict sur les champs critiques (`id`, `name`, `status`, `monthly_cost`), `z.coerce.number()` pour les numbers potentiellement-string, tout le reste `optional` avec fallback "—" au rendu.
- **Niveau liste** (`toolListSchema = z.array(z.unknown()).transform(...)`) : drop silencieusement les items dont le parse échoue. Un tool cassé ne fait pas tomber toute la page.

Validation Zod partout : chaque réponse API est `schema.safeParse`-ée dans `RequestManager.request`. Un mismatch de shape → `Response<Ko>` avec le message Zod détaillé (path + message par issue), jamais un crash à runtime.

### Query keys hiérarchiques → invalidation en cascade

Les query keys suivent le format `[resource, scope?, ...params]` :

- `['tools', 'all']`
- `['tools', 'recent', 8]`
- `['tools', 'status', 'active']`
- `['tools', 42]` (byId)

Une mutation invalide le prefix `['tools']` :

```ts
queryClient.invalidateQueries({ queryKey: ['tools'] });
```

Toutes les variantes (`all`, `recent`, `status`, `byId`) se rafraîchissent automatiquement. Plus besoin de tracker manuellement quelles queries invalider après chaque CRUD.

### URL as state

Les filtres Tools, la recherche, le theme — tout ce qui est "partageable" vit dans l'URL (query params). Le theme est en plus persisté dans `localStorage` via next-themes. Zustand reste dans l'arsenal mais n'a pas été nécessaire pour cette itération (pas d'état UI complexe cross-component).

---

## 📱 Progressive Responsive Design

Approche **mobile-first stricte** : chaque composant est designed en mobile par défaut, puis étendu via les breakpoints Tailwind.

### Breakpoints

Breakpoints Tailwind natifs alignés avec le brief (Mobile <640, Tablet 640-1024, Desktop >1024).

| Prefix | Min width | Usage principal                                          |
| ------ | --------- | -------------------------------------------------------- |
| _base_ | 0px       | Mobile — stack vertical, cards 1-col, mobile menu drawer |
| `sm:`  | 640px     | Tablet — grilles 2-col                                   |
| `md:`  | 768px     | Header nav horizontale + search                          |
| `lg:`  | 1024px    | Desktop — grilles 4-col (KPIs)                           |

### Max-width container

Un token `--container-app: 1400px` défini dans `@theme inline` de `globals.css` génère l'utility `max-w-app`. Utilisé sur le `<header>` et les 3 `<main>` — un seul endroit à changer pour ajuster la largeur maximale de l'app, pas de magic number `max-w-[1400px]` disséminé.

### Patterns par page

- **Dashboard** : 4 KPI cards en `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`. Table Recent Tools : scroll horizontal natif via `overflow-x-auto` (inclus dans le wrapper du `Table` shadcn) sur petits écrans, full width desktop.
- **Tools** : toolbar filters en `flex flex-wrap gap-2` → les dropdowns wrap naturellement en 2 lignes sur petits écrans. Table : même stratégie scroll horizontal. Page header en `flex-col` (stacked) sur mobile, `sm:flex-row` avec le bouton "Add Tool" aligné à droite dès sm:.
- **Analytics** : Budget card full width. Les 2 pies en `grid gap-6 md:grid-cols-2` — stackées mobile, side-by-side dès tablet. Bar chart `h-80 w-full` toujours full width, les labels de tools sont tronqués via `YAxis width={110}`.
- **Header & navigation** : Desktop ≥`lg:` → `<Header>` complet (BrandMark + Navigation + SearchInput + HeaderActions). Mobile/tablet <`lg:` → `<Header>` condensé (BrandMark + HeaderActions seulement) + `<BottomTabBar>` fixe en bas (3 onglets nav + loupe). La loupe ouvre un `<Drawer>` vaul qui monte conditionnellement `<SearchInput autoFocus />` — focus immédiat à l'open sans setTimeout (composant non monté tant que le drawer est fermé, autoFocus HTML natif déclenché à l'insertion dans le DOM).

### Touch-friendly partout

Tous les boutons / inputs respectent la guideline touch target (~44×44 CSS pixels) via `size-9` (36px) + `py-1.5`/`py-2` + padding généreux dans les Select triggers. Les dropdowns s'ouvrent avec un offset suffisant (`sideOffset={4}`) pour éviter les accrocs au scroll.

---

## ⚡ Performance Optimizations

### Build & bundle

- **Turbopack** par défaut en dev ET build (Next 16)
- **Toutes les 5 routes prerenderent en static** (`○` dans le `next build` output) — pas de serveur Node nécessaire pour servir le HTML initial
- **Tree-shaking agressif** : `process.env.NODE_ENV` est inliné au build → `isDev && <ReactQueryDevtools />` dans [src/shared/providers/AppProviders.tsx](src/shared/providers/AppProviders.tsx) est littéralement droppé du bundle prod
- **Devtools en dev uniquement** via le guard `isDev` des helpers [src/config/env.ts](src/config/env.ts)
- **Favicon dynamique** via `next/og` `ImageResponse` → PNG généré au build, zéro fichier binaire à maintenir, cohérent avec `<BrandMark>` par construction

### Data fetching

- **Prefetch serveur fire-and-forget** (`queryClient.prefetchQuery(...)` **sans `await`**) — le fetch démarre au tout début du render, en parallèle du rendering
- **Streaming SSR** via `<Suspense>` + `<HydrationBoundary>` — le shell HTML part immédiatement, les blocks data streament quand ils sont prêts
- **`useSuspenseQuery` côté client** — hydrate directement avec la data prefetched, zéro loading flash si le fetch serveur a terminé avant le shell
- **`QueryClient` per-request côté serveur** via `React.cache` → pas de cross-contamination entre users
- **TanStack Query dedupe les requêtes** : plusieurs composants qui `useSuspenseQuery` la même key (ex: `KpisSection` + `RecentToolsTable` sur Dashboard) → une seule requête réseau
- **`staleTime: 60s`** — réutilisation agressive du cache côté client
- **Query keys hiérarchiques** → invalidations ciblées, pas de sur-invalidation
- **Over-fetch + slice** côté service pour compenser la junk data (`getRecent` demande `limit * 4` et slice après Zod validation) — un seul round-trip réseau, pas de pagination à orchestrer

### Runtime

- **Inter via `next/font/google`** → preload + self-hosted, zéro flash of unstyled text
- **`next-themes` pre-hydration script** injecté dans `<head>` → zéro flash of wrong theme au premier paint
- **`useMemo` sur les data dérivées** (filters combinés, groupBy + sum, derived options pour les Select)
- **Search submit-on-Enter** — typing vit dans un state local (`pendingValue`), push URL uniquement au `commit()`. Zéro debounce, zéro `router.replace` spammé, **1 seule requête RSC par recherche**
- **`useOptimistic` dans `useSearchParam`** — entre le `router.replace` et la mise à jour effective de `searchParams`, la valeur committée est affichée de façon optimiste → zéro flash de l'ancienne valeur sur l'input
- **`useSyncExternalStore` pour `useMounted`** — hydration guard lint-clean, évite la règle `react-hooks/set-state-in-effect` de React 19.2

### Images

Icônes d'outils via `<img>` + fallback `onError` qui affiche l'initiale (composant [src/features/tools/components/ToolIcon.tsx](src/features/tools/components/ToolIcon.tsx)). Pas de `next/image` parce que les hosts CDN sont arbitraires (logo.clearbit.com, fonts perso, etc.) — le gain d'optimisation sur 24×24px ne justifie pas le coût de maintenance d'une whitelist `remotePatterns`.

---

## 📈 Data Visualization Philosophy

### Choix : shadcn `Chart` (wrapper sur Recharts 3.x)

**Pourquoi pas Chart.js** : API impérative, difficile à intégrer proprement dans un arbre React. Forcément en client component, coûteux à restyler aux tokens CSS.

**Pourquoi pas Visx** : bas niveau, demande beaucoup de code pour produire le même résultat. Overkill pour 4 charts standards.

**Pourquoi pas D3 direct** : idem.

**Pourquoi shadcn Chart :**

- **Wrapper Recharts** → API déclarative, typée, React-first
- **Théming via CSS variables** — les charts consomment `--color-chart-1` à `--color-chart-5` définis dans `globals.css`, donc **zéro couleur hardcodée dans les composants chart**. Changer la palette = une modification dans `globals.css`, tous les charts se mettent à jour
- **Tooltips + légendes stylés par défaut** — cohérence visuelle avec le reste de shadcn sans effort custom
- **`ChartConfig` typé** — TS connaît le label et la couleur de chaque série, les tooltips picken les labels automatiquement
- **Même DX que le reste du design system** — on compose `Card` + `ChartContainer` + primitives Recharts, même pattern que partout ailleurs

### Principes appliqués

- **Pas de 3D, pas d'animations gratuites.** Les charts animent uniquement le mounting, jamais les transitions.
- **Légendes lisibles et concises.** Custom grid de légende en-dessous de chaque pie plutôt que la légende Recharts par défaut — plus dense, plus scannable, `tabular-nums` sur les valeurs monétaires.
- **Tooltip = source de vérité détaillée**, pas le chart lui-même. Le chart donne la forme, le tooltip donne la valeur exacte au survol.
- **Color-matching avec les autres composants.** Le `StatusDistributionChart` utilise les mêmes couleurs (OKLCH) que `StatusBadge` — un user qui voit un slice rouge reconnaît instantanément "unused".
- **Contraintes du dataset acceptées.** Pas de "Monthly Spend Evolution" line chart parce qu'on n'a que 2 points de données (`current_month_total` + `previous_month_total`) — mieux vaut pas de chart qu'un chart mensonger avec de la data synthétique. Idem pour le time range picker : non exposé tant que l'API ne le supporte pas.

---

## 🧪 Testing Strategy

**Tests non livrés dans cette itération.** Pour un test technique 3 jours axé design system + intégration data + livrables visuels, le temps a été alloué sur les features plutôt que sur la couverture de tests. Choix assumé et documenté ici.

**Ce qui serait testé dans un contexte prod :**

### Unit tests (Vitest)

- Fonctions pures critiques : `formatCurrency`, `formatCurrencyCompact`, `formatRelativeTime`
- Adaptateurs de data : `unwrapResponse`, le parseur tolérant dans `toolListSchema`
- Logique de filtrage dans `ToolsTable` (extraite en hook `useFilteredTools` si elle grossit)

### Component tests (Testing Library)

- Primitives réutilisées : `StatusBadge` (3 variantes), `KpiCard` (4 variantes × visible / skeleton)
- Formulaires : `ToolForm` (validation Zod, messages d'erreur, soumission, mode create vs edit)
- Interactions : `ToolActionsDropdown` (chaque item déclenche la bonne mutation, dialogs s'ouvrent)
- Hydration guard : `useMounted` (server renvoie `false`, client renvoie `true` après mount)

### Integration tests (Vitest + MSW)

- Flows data-dépendants : `RecentToolsTable` avec data mockée, `KpisSection` avec les 3 queries parallèles
- URL ↔ UI : `SearchInput` + `ToolsTable` (tape → Enter → URL update → table filter, + clear button qui push URL vide)
- Mutations end-to-end : `ToolFormDialog` (create) → `toolsService.create` → invalidate → refetch

### E2E tests (Playwright)

Scenarios couvrant les 3 user journeys principaux :

1. **Journey Dashboard → Tools → Action** : arriver sur Dashboard, voir Recent Tools, cliquer sur la nav Tools, filtrer par status expiring, éditer un tool, vérifier que le toast success apparaît.
2. **Journey deep-link Analytics** : ouvrir `/analytics`, vérifier que les 4 charts sont rendus avec data réelle (mock API via fixtures).
3. **Theme persistence** : toggle dark mode, recharger, vérifier que dark est toujours actif. Changer d'onglet, vérifier sync.

### CI

GitHub Actions qui bloque les PR sur : `pnpm lint` + `pnpm format:check` + `pnpm build` + (plus tard) `pnpm test` et `pnpm e2e`.

---

## 🔮 Next Steps / Complete App Vision

### Court terme (itérations 2-3)

- **Bulk operations dans Tools** (multi-select + bulk delete / bulk toggle / bulk archive) — déjà structuré dans la roadmap
- **Cross-page navigation depuis Analytics** : click sur un slice du `DepartmentCostChart` → `/tools?department=X`, click sur `StatusDistributionChart` → `/tools?status=X` (commit de polish planifié juste après ce README)
- **View details dédié** (Sheet read-only) pour voir un tool sans ouvrir le form d'édition
- ~~**Error boundaries** autour des Suspense~~ ✅ fait sur Analytics + Dashboard + Tools — chaque bloc data-fetching a son propre `ErrorBoundary` (react-error-boundary) + `QueryErrorResetBoundary` de TanStack Query via les primitives partagées `<Block>` (hors Card) et `<BlockCard>` (dans Card). Si une query plante, seul ce bloc affiche `<BlockRetry>` (icône + message + bouton Retry), les autres blocs restent fonctionnels.
- **Time range picker** sur Analytics si le JSON server expose un jour `/analytics?from=...&to=...`
- **Tests unitaires** sur les helpers pures et les primitives réutilisées
- **Aligner le header du `RecentToolsSection`** : depuis l'ajout du sort + pagination sur `RecentToolsTable`, le tableau affiche tous les tools (pas seulement les 8 récents). Le sous-titre "Last 30 days" devient trompeur — à remplacer par un compteur total (ex: "42 tools") ou retirer, selon la direction produit

### Moyen terme (produit)

- **Auth réelle** (Next-Auth avec un IdP d'entreprise), remplacement du `DEMO_USER` hardcodé
- **Notifications center** connecté au bell icon : nouveaux tools en attente d'approbation, budgets dépassés, licences expirant dans les 30 jours
- **Alertes configurables** : seuil budget, seuils d'utilisation par outil, notification email / Slack
- **Exports PDF / Excel** des reports Analytics (jsPDF + SheetJS)
- **Audit log** : qui a ajouté / modifié / supprimé quel outil, quand
- **Monthly Spend Evolution** (line chart) dès que l'API expose l'historique mensuel

### Long terme (valeur business)

- **Recommandation d'outils redondants** — ML côté backend pour détecter les tools qui se chevauchent fonctionnellement (Slack + Teams, Figma + Sketch) — économies identifiées automatiquement
- **Prédiction de spend** basée sur la courbe d'usage (régression linéaire sur les 6 derniers mois)
- **Intégration SSO avec les outils** pour détecter l'usage réel (fini le `active_users_count` manuel, on mesure les connexions)
- **Mobile app companion** pour notifications + approbations one-click
- **Multi-tenancy** si TechCorp Internal Tools devient un produit SaaS vendu à d'autres organisations

---

## API back-end

Les données proviennent d'un JSON server mis à disposition dans le cadre du test :

- **Base URL** : `https://tt-jsonserver-01.alt-tools.tech/`
- Ressources : `/departments`, `/users`, `/tools`, `/user_tools`, `/analytics`
- Query params json-server : `_sort`, `_order`, `_limit`, `_page`, `_embed`, et les filtres `?status=`, `?name_like=`, etc.
- Supporte `POST`, `PATCH`, `DELETE` pour les mutations (utilisé par les `toolsService.create` / `update` / `remove`)

---

## Roadmap

- [x] **Jour 0 — Setup** : scaffold Next 16, stack complète, tooling (ESLint + Prettier)
- [x] **Jour 0 — Foundation (providers)** : `AppProviders` (next-themes + TanStack Query + Devtools + Toaster), layout root avec `suppressHydrationWarning`, configuration `NEXT_PUBLIC_API_URL`, police Inter, constante `BRAND`
- [x] **Jour 0 — Foundation (API layer)** : `RequestManager`, 5 DTOs, 5 services, validators Zod génériques + enums de domaine, factory `getServerQueryClient` per-request
- [x] **Jour 0 — Foundation (query options)** : 5 namespaces de query options partagées serveur/client, adaptateur `unwrapResponse`
- [x] **Jour 6 — Shell applicatif** : `Header`, `Navigation`, `ThemeToggle`, `UserMenu`, `BrandMark`
- [x] **Jour 6 — Dashboard KPIs** : 4 KPI cards alimentés par 3 queries parallèles, prefetch + Suspense + skeleton
- [x] **Jour 6 — Recent Tools** : table 5 colonnes, `StatusBadge`, `ToolIcon`, stratégie d'over-fetch pour compenser la junk data
- [x] **Jour 7 — Tools catalog (display)** : page `/tools`, table 8 colonnes, recherche URL-backed via `SearchInput` + `useSearchParam` (submit-on-Enter + `useOptimistic`)
- [x] **Jour 7 — Tools filters** : toolbar avec 3 dropdowns (Department / Status / Category) + range Min/Max Cost, URL-backed, `Clear filters` conditionnel
- [x] **Jour 7 — Tools management (CRUD per-row)** : Add / Edit / Delete / Toggle status via `ToolForm` (react-hook-form + standardSchemaResolver), mutations TanStack Query avec invalidation `['tools']` et toasts Sonner
- [ ] **Jour 7 — Tools bulk ops** (optionnel) : multi-select + bulk actions
- [x] **Jour 8 — Analytics (core)** : 4 sections (`BudgetOverviewCard`, `DepartmentCostChart`, `StatusDistributionChart`, `TopExpensiveToolsChart`), shadcn Chart + Recharts, palette `--chart-1..5` passée du grayscale au coloré OKLCH
- [x] **Jour 8 — Polish (cross-page nav + error handling)** : slices des 3 charts Analytics cliquables (Department → `/tools?department=`, Status → `/tools?status=`, Top Expensive → `/tools?search=`), `error.tsx` global (Try again / Back to dashboard), `not-found.tsx` 404 branded
- [x] **Post-J8 — Mobile shell & refacto search** : `<BottomTabBar>` (nav fixe mobile/tablet avec 3 items + loupe search dans un `<Drawer>` vaul), `<SearchInput>` + `useSearchParam` déplacés dans `shared/` (réutilisables cross-feature), passage live-search debouncé → submit-on-Enter avec `useOptimistic`, `<NavLink>` avec cva variants `pill`/`tab`, utility `btn-link` + tokens typo `text-link` / `text-link-sm`, alignement breakpoints brief (mobile <`sm:`, tablet `sm:`-`lg:`, desktop ≥`lg:`), suppression hors-brief (`MobileMenu`, route `settings`)
- [ ] **Jour 8 — Analytics (optionnel)** : usage analytics (adoption rates, most/least used, growth trends) + insights (unused tool alerts, ROI projections)
