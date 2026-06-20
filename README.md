# CareConnect EMR — Frontend

CareConnect EMR is an Angular 20 standalone frontend for a patient portal / EMR-style application. The current frontend centers on authentication, a protected shell layout, and a role-aware dashboard backed by a .NET API.

## Overview

This codebase currently provides:

- Standalone Angular application bootstrapped with `bootstrapApplication`
- Login flow against backend auth endpoints
- Session restore on app startup through refresh token exchange (via `provideAppInitializer`)
- Route guards for authenticated and guest-only pages
- Protected shell layout with a header and collapsible sidebar
- Permission-based sidebar navigation for `Admin`, `Doctor`, and `Receptionist`
- Dashboard entry route that switches the rendered dashboard by logged-in user role
- Role-owned dashboards (Admin, Doctor, Receptionist) each with their own component-scoped service and state
- Admin dashboard connected to live summary data from the backend
- Shared stat cards, loading skeletons, and snackbar notifications
- Centralized, typed permission model used across navigation (route guards to follow for feature pages)

## Tech Stack

- Angular 20.2.x
- TypeScript
- Angular Signals
- Angular Material
- Bootstrap 5
- RxJS
- ApexCharts / `ng-apexcharts`
- SCSS

## App Structure

```text
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── api/
│   │   │   │   ├── api-response.ts
│   │   │   │   └── paged-result.ts
│   │   │   ├── auth/
│   │   │   │   ├── models/
│   │   │   │   │   ├── auth-response.ts
│   │   │   │   │   ├── login-request.ts
│   │   │   │   │   ├── refresh-token-request.ts
│   │   │   │   │   └── user.ts
│   │   │   │   ├── permissions.ts
│   │   │   │   ├── role-permissions.ts
│   │   │   │   └── roles.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth-guard.ts
│   │   │   │   ├── guest-guard.ts
│   │   │   │   └── role-guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth-interceptor.ts
│   │   │   ├── navigation/
│   │   │   │   ├── nav-item.ts
│   │   │   │   └── navigation.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── layout.service.ts
│   │   │   │   └── snackbar.service.ts
│   │   │   └── strategies/
│   │   │       └── page-title.ts
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   └── login/
│   │   │   │       ├── login.html
│   │   │   │       ├── login.scss
│   │   │   │       └── login.ts
│   │   │   └── dashboard/
│   │   │       ├── models/
│   │   │       │   ├── appointment-breakdown.ts
│   │   │       │   ├── appointment-queue.ts
│   │   │       │   ├── dashboard-response.ts
│   │   │       │   ├── doctor-load.ts
│   │   │       │   ├── index.ts
│   │   │       │   ├── next-appointment.ts
│   │   │       │   ├── recent-patient.ts
│   │   │       │   ├── stat-card.ts
│   │   │       │   └── today-schedule.ts
│   │   │       ├── roles/
│   │   │       │   ├── admin/
│   │   │       │   │   ├── components/
│   │   │       │   │   │   ├── appointment-breakdown/
│   │   │       │   │   │   ├── recent-registrations/
│   │   │       │   │   │   └── top-doctors/
│   │   │       │   │   ├── admin-dashboard.html
│   │   │       │   │   ├── admin-dashboard.scss
│   │   │       │   │   ├── admin-dashboard.service.ts
│   │   │       │   │   └── admin-dashboard.ts
│   │   │       │   ├── doctor/
│   │   │       │   │   ├── components/
│   │   │       │   │   ├── doctor-dashboard.html
│   │   │       │   │   ├── doctor-dashboard.scss
│   │   │       │   │   ├── doctor-dashboard.service.ts
│   │   │       │   │   └── doctor-dashboard.ts
│   │   │       │   └── receptionist/
│   │   │       │       ├── components/
│   │   │       │       │   └── todays-queue/
│   │   │       │       │       ├── todays-queue-skeleton.html
│   │   │       │       │       ├── todays-queue-skeleton.scss
│   │   │       │       │       ├── todays-queue-skeleton.ts
│   │   │       │       │       ├── todays-queue.html
│   │   │       │       │       ├── todays-queue.scss
│   │   │       │       │       └── todays-queue.ts
│   │   │       │       ├── receptionist-dashboard.html
│   │   │       │       ├── receptionist-dashboard.scss
│   │   │       │       ├── receptionist-dashboard.service.ts
│   │   │       │       └── receptionist-dashboard.ts
│   │   │       ├── dashboard.html
│   │   │       ├── dashboard.scss
│   │   │       └── dashboard.ts
│   │   ├── layout/
│   │   │   ├── header/
│   │   │   │   ├── header.html
│   │   │   │   ├── header.scss
│   │   │   │   └── header.ts
│   │   │   ├── shell/
│   │   │   │   ├── shell.html
│   │   │   │   ├── shell.scss
│   │   │   │   └── shell.ts
│   │   │   └── sidebar/
│   │   │       ├── sidebar.html
│   │   │       ├── sidebar.scss
│   │   │       └── sidebar.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   └── stat-card/
│   │   │   │       ├── stat-card-skeleton.html
│   │   │   │       ├── stat-card-skeleton.scss
│   │   │   │       ├── stat-card-skeleton.ts
│   │   │   │       ├── stat-card.html
│   │   │   │       ├── stat-card.scss
│   │   │   │       └── stat-card.ts
│   │   │   └── models/
│   │   │       └── stat-card-ui.ts
│   │   ├── app.config.ts
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.scss
│   │   └── app.ts
│   ├── environments/
│   │   ├── environment.development.ts
│   │   └── environment.ts
│   ├── styles/
│   │   └── _snackbar.scss
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── package.json
├── proxy.conf.json
├── tsconfig.app.json
├── tsconfig.json
└── vercel.json
```

## Routing

The active routes in the app are:

- `/login`
- `/dashboard`

Routing behavior:

- `/` redirects to `/login`
- `/login` is protected by `guestGuard`
- `/dashboard` is rendered inside the shared `Shell` and protected by `authGuard` only — every authenticated role has a dashboard, so it is not permission-gated
- unknown routes redirect back to `/login`

`Patients`, `Appointments`, and `Users` exist in the navigation config but their routes/pages are not yet implemented.

## Authentication Flow

Authentication is handled by `core/services/auth.service.ts`.

Current behavior:

- `login()` posts credentials to `POST /Auth/login`
- successful login stores the access token in memory
- refresh token values are stored in `localStorage`
- app startup calls `refreshToken()` via `provideAppInitializer` (migrated off the legacy `APP_INITIALIZER` token in `app.config.ts`)
- `logout()` posts to `POST /Auth/logout`, clears local session state, and redirects to `/login`
- authenticated requests receive a bearer token through the HTTP interceptor
- `401` responses trigger a refresh-token retry flow in the interceptor

Related pieces:

- `core/interceptors/auth-interceptor.ts`
- `core/guards/auth-guard.ts`
- `core/guards/guest-guard.ts`
- `app.config.ts`

## BFF (Backend-For-Frontend) Architecture

To handle modern browser security requirements and ensure reliable cookie management, this project employs a **Backend-For-Frontend (BFF)** pattern.

### Vercel Proxying (Production)

The frontend acts as a proxy for the backend API, so requests appear to come from the same origin, avoiding CORS issues and allowing for secure cookie handling.

Configured in `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/bff/:path*",
      "destination": "https://careconnectemr-backend.runasp.net/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Local Development Proxy

`proxy.conf.json` maps `/bff` to the local .NET API during development:

```json
{
  "/bff": {
    "target": "https://localhost:7024",
    "secure": false,
    "pathRewrite": {
      "^/bff": "/api"
    }
  }
}
```

## Layout And Navigation

Authenticated pages render inside a shared shell:

- `layout/shell`
- `layout/header`
- `layout/sidebar`

`core/services/layout.service.ts` uses Angular signals to manage desktop sidebar collapsed state and mobile sidebar open state.

Navigation is defined in `core/navigation/navigation.ts`. Items carry a single `permission: Permission` (instead of a `roles: string[]` array), and the sidebar filters with `hasPermission(currentUser.role, item.permission)` from `core/auth/role-permissions.ts`.

Currently configured navigation items:

- Dashboard
- Patients
- Appointments
- Users

Only the dashboard route is implemented today; the other entries are present in navigation but their feature pages are not yet wired in this frontend.

## Permissions & Roles

Roles are typed rather than raw strings (`core/auth/roles.ts`):

```ts
export const USER_ROLES = {
  Admin: 'Admin',
  Doctor: 'Doctor',
  Receptionist: 'Receptionist',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
```

Permissions are centralized in `core/auth/permissions.ts` and mapped to roles in `core/auth/role-permissions.ts` via `hasPermission(role, permission)`. Navigation, and eventually route guards and in-page actions, consume this single mapping rather than scattering role checks across the app.

**Important:** frontend permission checks are UX/navigation convenience only. The backend JWT-based authorization remains the actual security boundary — see Backend Permission Notes below.

## Dashboard

The dashboard host component (`features/dashboard/dashboard.ts`) chooses which dashboard to render based on `currentUser().role`. Each role owns its own dashboard folder, component, and service under `features/dashboard/roles/`, rather than sharing one root-level service with mixed `adminData` / `doctorData` / `receptionistData` state.

Each role service (`AdminDashboardService`, `DoctorDashboardService`, `ReceptionistDashboardService`) is `@Injectable()` (no `providedIn: 'root'`) and is provided at the component level via `providers: [...]`, so its `data` and `isLoading` signals live and die with that dashboard component instead of persisting globally. All three currently call the same backend endpoint, `GET /Dashboard/summary`, which returns a different DTO shape depending on the JWT role.

Initial data load uses `ngOnInit()` calling `dashboardService.load().subscribe()`, rather than an `effect()` with no signal dependency.

### Admin Dashboard

Key files: `features/dashboard/roles/admin/`

- summary stat cards
- appointment breakdown donut chart
- top doctors table
- recent registrations table
- loading skeletons while data is being fetched
- CSV download for filtered recent registrations

### Doctor Dashboard

Key files: `features/dashboard/roles/doctor/`

- Today's Schedule widget (tabular and card views)
- Next Appointment summary
- Clinical stat cards
- Loading skeletons

### Receptionist Dashboard

Key files: `features/dashboard/roles/receptionist/`

- Today's Appointments management (Today's Queue)
- Quick patient registration access
- Facility-wide clinical stat cards
- Loading skeletons

## Models & API Typing

- `core/api/api-response.ts` — `ApiResponse<T>.data` is typed `T | null`, matching the backend's nullable `Result.Data`. Consumers (e.g. the auth interceptor) now guard with `if (!res.isSuccess || !res.data)` before use.
- `core/api/paged-result.ts` — added in preparation for paged list endpoints (patients, appointments, users).
- `features/dashboard/models/*` — dashboard DTOs live in the dashboard feature rather than `core`, since they're only consumed there, and are re-exported via `models/index.ts`. Date fields (`startTime`, `endTime`, `registeredAt`, etc.) are typed as `string`, since `HttpClient` does not auto-convert JSON date strings to `Date` objects — conversion happens in display/helper logic only when needed.
- `shared/models/stat-card-ui.ts` — shared UI-level model backing the `stat-card` / `stat-card-skeleton` components used across all three dashboards.

## Environment Configuration

Environment files live in `src/environments`.

- API URL: `/bff` (proxied via Vercel or local proxy)
- App name: `CareConnectEMR`

`ng serve` uses the development configuration by default (`environment.development.ts`).

## Backend Endpoints In Use

- `POST /Auth/login`
- `POST /Auth/logout`
- `POST /Auth/refresh-token`
- `GET /Dashboard/summary` (role-aware summary data for Admin, Doctor, and Receptionist)

## Backend Permission Notes

Backend currently enforces:

```text
Patients:
  list/view      Admin, Doctor, Receptionist
  register       Admin, Receptionist
  update         Admin, Doctor
  delete         Admin

Appointments:
  list/view      Admin, Doctor, Receptionist
  register       Admin, Receptionist
  update         Admin, Receptionist
  status         Admin, Doctor, Receptionist (controller-level)
  cancel         Admin, Receptionist

Users:
  all actions    Admin

Dashboard:
  all authenticated roles, response shape changes by role
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI compatible with Angular 20

### Install

```bash
npm install
```

### Start The Development Server

```bash
npm start
```

### Build

```bash
npm run build
```

## Development Notes

- The project uses standalone components instead of NgModules.
- Dependency injection follows the modern `inject()` style.
- Signals are used for auth state, layout state, and dashboard state.
- Route guards and the interceptor are implemented with Angular functional APIs.
- App-startup session refresh uses `provideAppInitializer` (not the legacy `APP_INITIALIZER` DI token).
- Dashboard role services are provided at the component level (`providers: [...]`), not `providedIn: 'root'`, so role-specific dashboard state doesn't persist beyond that screen.
- Navigation is permission-based (`Permission`), not role-array-based (`roles: string[]`).
- The login form includes a `rememberMe` control, but there is no separate remember-me persistence logic in the current frontend.
- A `role-guard` exists in `core/guards`, but it is not currently used by the active route configuration; a `permissionGuard` is planned for future feature routes (`/patients/new`, `/patients/:id/edit`, `/users`, `/appointments`).

## Current Scope Summary

Implemented and working:

- authentication and startup session refresh
- protected shell layout
- permission-aware sidebar rendering
- typed roles and centralized permission model
- role-owned dashboards with component-scoped services (Admin, Doctor, Receptionist)
- admin dashboard API integration
- doctor dashboard API integration (Today's Schedule, Next Appointment)
- receptionist dashboard API integration (Today's Queue)
- chart/table/stat-card dashboard widgets

Present but not fully implemented:

- patients, appointments, and users feature routes/pages
- `permissionGuard` for feature route protection

## Author

**Shaheer Asim**
Software Engineer
[GitHub](https://github.com/shaheerasim320)
[LinkedIn](https://linkedin.com/in/shaheer-asim-4b08a2367)