# CareConnect EMR

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Deployed on Vercel](https://img.shields.io/badge/deployed-Vercel-000000?logo=vercel)](https://careconnect-emr.vercel.app)

Staff-facing Angular frontend for CareConnect EMR. Provides role-aware dashboards,
patient management, and appointment workflows for Admin, Doctor, and Receptionist roles.

**Live:** [careconnect-emr.vercel.app](https://careconnect-emr.vercel.app)  
**Backend:** [CareConnect EMR API](https://github.com/shaheerasim320/CareConnectEMR-Backend)

## Highlights

- Role-owned dashboards with component-scoped state — no cross-role data leakage
- Centralized permission model: a single `hasPermission(role, permission)` function
  drives navigation, route guards, and in-page action visibility
- URL-synced filter state on list pages — search, status, page, and page size
  reflected as query params; back/forward and direct URL navigation restore exact state
- JWT bearer authentication with HttpOnly refresh token cookies via a BFF proxy pattern
- Angular Signals throughout — auth state, layout state, and feature state with no
  BehaviorSubjects or manual change detection
- Role-enforced UI — server-side rules mirrored client-side; admin-only controls
  are absent (not just disabled) for other roles
- Responsive layout — table views on desktop, card views on mobile with adapted
  filter and pagination controls

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Angular 20, standalone components |
| Language | TypeScript |
| State | Angular Signals |
| UI | Angular Material, Bootstrap 5 |
| Charts | ApexCharts / ng-apexcharts |
| Styles | SCSS |
| Auth | JWT bearer + HttpOnly refresh token cookies |
| API proxy | Vercel rewrites (production), Angular dev proxy (local) |
| Deployment | Vercel |

## Features and access

| Feature | Admin | Doctor | Receptionist |
| --- | :---: | :---: | :---: |
| Role-specific dashboard | ✓ | ✓ | ✓ |
| View patients | ✓ | ✓ | ✓ |
| Register patients | ✓ | — | ✓ |
| Update patient details | ✓ | — | ✓ |
| Update clinical fields | ✓ | ✓ | — |
| Change patient status | ✓ | — | — |
| Export patient list as CSV | ✓ | — | — |
| View appointments | ✓ | ✓ | ✓ |
| Book / reschedule / cancel appointments | ✓ | — | ✓ |
| Update appointment status | Any valid transition | Complete own | Check-in / scheduling |
| Manage staff accounts | ✓ | — | — |

## Dashboards

Each role renders a dashboard built for its specific workflow:

**Admin** — system-wide stat cards, appointment breakdown donut chart, top doctors
by appointment load, recent patient registrations table with CSV export.

**Doctor** — today's schedule (table and card views), next appointment summary,
clinical stat cards.

**Receptionist** — today's appointment queue, quick patient registration access,
facility-wide stat cards.

## Architecture decisions

**Role-scoped services at the component level** — each dashboard role owns its own
service provided via `providers: [...]` on the component, not `providedIn: 'root'`.
State lives and dies with the component.

**Centralized permission model** — permissions are defined in `core/auth/permissions.ts`
and mapped to roles in `core/auth/role-permissions.ts`. Navigation items, route guards,
and in-page action rendering all consume `hasPermission()` rather than scattering role
string checks across the app.

**URL as filter source of truth** — list page filters write to query params via
`router.navigate()` with `queryParamsHandling: 'merge'`. The `queryParamMap`
subscription hydrates the filter UI and triggers the API call. No separate filter
state diverges from the URL.

**BFF proxy** — all API calls route through `/bff` rather than the backend origin
directly. Vercel rewrites handle production; `proxy.conf.json` handles local
development. Keeps CORS clean and cookie scope consistent across environments.

**Generic shared components** — confirm dialogs, stat cards, and skeletons are
domain-agnostic and accept typed config inputs. Domain-specific wording is passed
by the caller, not hardcoded in the component.

**Permission-guarded routes** — feature routes declare a `data: { permission }` value
consumed by `permissionGuard`. Unauthenticated users are redirected to `/login`;
authenticated users without the required permission are redirected to `/dashboard`.

## Project structure

```text
src/app/
├── core/
│   ├── auth/           permission model, role definitions, guards
│   ├── interceptors/   JWT bearer attachment, 401 refresh retry
│   ├── navigation/     nav item definitions and permission mapping
│   └── services/       auth, layout, snackbar
├── features/
│   ├── auth/           login
│   ├── dashboard/      role-owned dashboards (admin, doctor, receptionist)
│   └── patients/       patient list, registration, detail
├── layout/             shell, header, sidebar
└── shared/             confirm dialog, stat cards, summary cards, skeletons
```

Dependencies flow inward: `features → shared/core`; `layout → core`.
Features do not import from other features.

## Status

| Feature | Status |
| --- | --- |
| Authentication and session restore | ✓ Complete |
| Role-aware dashboards (all 3 roles) | ✓ Complete |
| Patient listing with URL-synced filters | ✓ Complete |
| Permission-guarded feature routes | ✓ Complete |
| Patient registration and editing | 🔧 In progress |
| Appointments | 🔧 In progress |
| User management | 🔧 In progress |

## Run locally

Prerequisites: Node.js and Angular CLI compatible with Angular 20.

```bash
git clone https://github.com/shaheerasim320/CareConnectEMR-Frontend.git
cd CareConnectEMR-Frontend/frontend
npm install
npm start
```

The dev server starts at `http://localhost:4200`. API calls to `/bff` are proxied
to the local .NET API at `https://localhost:7024` via `proxy.conf.json`. The backend
must be running locally, or update `proxy.conf.json` to point at the live API.

## Deployment

The app deploys to Vercel. `vercel.json` configures two rewrite rules:

- `/bff/:path*` → `https://careconnectemr-backend.runasp.net/api/:path*`
- `/(.*)`  → `/index.html` (SPA fallback)

No separate build step is needed — Vercel runs `npm run build` on push.

## Roadmap

- Appointments feature (list, book, reschedule, cancel, status management)
- Patient registration and editing workflows
- User management (admin only)
- Automated unit and integration tests

## Author

**Shaheer Asim**  
[GitHub](https://github.com/shaheerasim320) · [LinkedIn](https://linkedin.com/in/shaheerasim320)