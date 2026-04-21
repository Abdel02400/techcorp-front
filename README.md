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
pnpm dev
```

L'application est disponible sur [http://localhost:3000](http://localhost:3000).

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

## Structure du projet

```
src/
├── app/             # Routes App Router (Dashboard, Tools, Analytics)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css  # Tailwind v4 @theme + tokens shadcn
├── components/
│   └── ui/          # Composants shadcn (Button, ...)
└── lib/
    └── utils.ts     # Helper cn()
```

> La structure va s'étoffer au fil des 3 jours : `hooks/` (data fetching), `types/` (modèles partagés), `components/` (composants custom header, kpi-card, tools-table, etc.).

---

## API back-end

Les données proviennent d'un JSON server mis à disposition :

- **Base URL** : `https://tt-jsonserver-01.alt-tools.tech/`
- Ressources : `/departments`, `/users`, `/tools`, `/user_tools`, `/analytics`
- Query params json-server : `_sort`, `_order`, `_limit`, `_page`, `_embed`, et les filtres `?status=`, `?name_like=`, etc.

---

## Roadmap

- [x] **Jour 0 — Setup** : scaffold Next 16, stack complète, tooling (ESLint + Prettier)
- [ ] **Jour 6 — Dashboard** : design system de base, header, 4 KPI cards, table Recent Tools, responsive, theme toggle
- [ ] **Jour 7 — Tools** : catalogue complet, filtres avancés, CRUD, bulk operations
- [ ] **Jour 8 — Analytics** : charts (cost + usage), insights, navigation cross-page
