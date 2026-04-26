# CareConnect EMR Frontend

CareConnect EMR is an Angular 20 standalone frontend for a patient portal / EMR-style application. The current frontend centers on authentication, a protected shell layout, and a role-aware dashboard backed by a .NET API.

## Overview

This codebase currently provides:

- Standalone Angular application bootstrapped with `bootstrapApplication`
- Login flow against backend auth endpoints
- Session restore on app startup through refresh token exchange
- Route guards for authenticated and guest-only pages
- Protected shell layout with a header and collapsible sidebar
- Role-filtered sidebar navigation for `Admin`, `Doctor`, and `Receptionist`
- Dashboard entry route that switches the rendered dashboard by logged-in user role
- Admin dashboard connected to live summary data from the backend
- Shared stat cards, loading skeletons, and snackbar notifications

## Tech Stack

- Angular 20
- TypeScript
- Angular Signals
- Angular Material
- Bootstrap 5
- RxJS
- ApexCharts / `ng-apexcharts`
- SCSS

## App Structure

```text
src/app
|-- core
|   |-- guards
|   |-- interceptors
|   |-- models
|   |-- navigation
|   |-- services
|   `-- strategies
|-- features
|   |-- auth
|   `-- dashboard
|-- layout
|   |-- header
|   |-- shell
|   `-- sidebar
`-- shared
    |-- component
    `-- models
```

## Routing

The active routes in the app are:

- `/login`
- `/dashboard`

Routing behavior:

- `/` redirects to `/login`
- `/login` is protected by `guestGuard`
- `/dashboard` is rendered inside the shared `Shell` and protected by `authGuard`
- unknown routes redirect back to `/login`

## Authentication Flow

Authentication is handled by [`src/app/core/services/auth.ts`](src/app/core/services/auth.ts).

Current behavior:

- `login()` posts credentials to `POST /Auth/login`
- successful login stores the access token in memory
- refresh token values are stored in `localStorage`
- `APP_INITIALIZER` calls `refreshToken()` during app startup
- `logout()` posts to `POST /Auth/logout`, clears local session state, and redirects to `/login`
- authenticated requests receive a bearer token through the HTTP interceptor
- `401` responses trigger a refresh-token retry flow in the interceptor

Related pieces:

- [`src/app/core/interceptors/auth-interceptor.ts`](src/app/core/interceptors/auth-interceptor.ts)
- [`src/app/core/guards/auth-guard.ts`](src/app/core/guards/auth-guard.ts)
- [`src/app/core/guards/guest-guard.ts`](src/app/core/guards/guest-guard.ts)
- [`src/app/app.config.ts`](src/app/app.config.ts)

## Layout And Navigation

Authenticated pages render inside a shared shell:

- [`src/app/layout/shell`](src/app/layout/shell)
- [`src/app/layout/header`](src/app/layout/header)
- [`src/app/layout/sidebar`](src/app/layout/sidebar)

The layout service uses Angular signals to manage:

- desktop sidebar collapsed state
- mobile sidebar open state

Navigation items are defined in [`src/app/core/navigation/navigation.ts`](src/app/core/navigation/navigation.ts). The sidebar filters them by the current user role before rendering.

Currently configured navigation items:

- Dashboard
- Patients
- Appointments
- Users

Only the dashboard route is implemented today; the other entries are present in navigation but their feature pages are not yet wired in this frontend.

## Dashboard

The dashboard host component chooses which dashboard to display based on `currentUser().role`.

### Admin Dashboard

The admin dashboard is the most complete area of the app. It fetches data from:

- `GET /Dashboard/summary`

The UI currently includes:

- summary stat cards
- appointment breakdown donut chart
- top doctors table
- recent registrations table
- loading skeletons while data is being fetched
- CSV download for filtered recent registrations

Key files:

- [`src/app/features/dashboard/services/dashboard.ts`](src/app/features/dashboard/services/dashboard.ts)
- [`src/app/features/dashboard/components/admin-dashboard`](src/app/features/dashboard/components/admin-dashboard)

### Doctor And Receptionist Dashboards

`DoctorDashboard` and `ReceptionistDashboard` components exist, but they are currently placeholders without live feature logic.

## Environment Configuration

Environment files live in [`src/environments`](src/environments).

Current values in the repo:

- development API URL: `https://localhost:7024/api`
- production API URL: `http://careconnectemr-backend.runasp.net/api`
- app name: `CareConnectEMR`

Angular serve uses the development configuration by default, which swaps in `environment.development.ts`.

## Backend Endpoints In Use

The frontend currently integrates with these backend endpoints:

- `POST /Auth/login`
- `POST /Auth/logout`
- `POST /Auth/refresh-token`
- `GET /Dashboard/summary`

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

The app will run with the Angular development configuration and use the local API URL from `environment.development.ts`.

### Build

```bash
npm run build
```

### Run Unit Tests

```bash
npm test
```

## Development Notes

- The project uses standalone components instead of NgModules.
- Dependency injection follows the modern `inject()` style.
- Signals are used for auth state, layout state, and dashboard state.
- Route guards and the interceptor are implemented with Angular functional APIs.
- The login form includes a `rememberMe` control, but there is no separate remember-me persistence logic in the current frontend.
- A `role-guard` file exists in `core/guards`, but it is not currently used by the active route configuration.

## Current Scope Summary

Implemented and working:

- authentication and startup session refresh
- protected shell layout
- role-aware sidebar rendering
- admin dashboard API integration
- chart/table/stat-card dashboard widgets

Present but not fully implemented:

- patients, appointments, and users feature routes/pages
- doctor dashboard feature content
- receptionist dashboard feature content

## Author

**Shaheer Asim**  
Software Engineer  
[GitHub](https://github.com/shaheerasim320)  
[LinkedIn](https://linkedin.com/in/shaheer-asim-4b08a2367)
