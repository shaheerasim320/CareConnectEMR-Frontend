# CareConnect EMR Frontend

CareConnect EMR is an Angular 20 frontend for a healthcare / EMR system. The current codebase focuses on authentication, protected app layout, and a role-aware dashboard experience connected to a .NET backend API.

## What Is Implemented

- Angular 20 standalone application bootstrapped with `bootstrapApplication`
- Route-based app shell with protected and guest-only navigation
- JWT-based authentication with access token handling on the client
- Refresh-token session restore during app startup using `APP_INITIALIZER`
- HTTP interceptor that attaches bearer tokens and retries requests after token refresh on `401`
- Signal-based client state for auth, layout, and dashboard data
- Responsive shell layout with header, sidebar, and mobile/desktop sidebar behavior
- Role-aware navigation filtering for `Admin`, `Doctor`, and `Receptionist`
- Login screen with reactive forms and validation
- Dashboard entry that switches UI by logged-in user role
- Admin dashboard wired to live summary API data
- Reusable animated stat cards and loading skeleton cards
- Custom page title strategy
- Angular Material + Bootstrap based UI foundation

## Current Frontend Scope

### Authentication

- Login request integration with the backend `Auth` endpoints
- Access token stored in the Angular auth service
- Refresh token flow executed with `withCredentials`
- Logout flow that clears client session and redirects to `/login`
- Guest guard to keep authenticated users out of the login page
- Auth guard to protect private routes

### App Bootstrap

- `APP_INITIALIZER` attempts a refresh-token call before the app fully loads
- Startup refresh is wrapped with timeout and fallback handling to avoid hanging the UI
- Global HTTP client is configured with the auth interceptor
- Document titles are updated automatically through a custom `TitleStrategy`

### Layout And Navigation

- Shared shell layout for authenticated pages
- Header with user info and logout action
- Sidebar with navigation filtered by current user role
- Layout service backed by signals for desktop collapse and mobile open state

### Dashboard

- Lazy-loaded dashboard route behind authentication
- Dashboard host component chooses a dashboard view by current user role
- Admin dashboard currently includes:
- Summary stat cards
- Appointment breakdown section
- Top doctors list
- Recent patient registrations table
- Loading skeletons while dashboard summary data is being fetched
- Doctor and receptionist dashboard components are scaffolded and ready for expansion

### Shared UI

- Reusable `app-stat-card` component with animated numeric display
- Reusable `app-stat-card-skeleton` component for loading states
- Snackbar service wrapper for notifications

## Recent Frontend Work

- Fixed the admin dashboard stat cards so they correctly map backend summary fields like `count` and `trendPercent`
- Corrected the stat-card binding issue where the template was passing `"stat.count"` as plain text instead of a bound value
- Updated dashboard models to match the actual API response shape
- Verified the frontend build after the dashboard fix

## Tech Stack

- Angular 20
- TypeScript
- Angular Material
- Bootstrap 5
- RxJS
- Angular Signals
- SCSS

## Project Structure

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
    `-- component
```

## Routes Available Right Now

- `/login`
- `/dashboard`

## Backend Integration In Use

The frontend is already integrated around these backend auth/dashboard flows:

- `POST /Auth/login`
- `POST /Auth/logout`
- `POST /Auth/refresh-token`
- `GET /Dashboard/summary`

The app expects the API base URL from the Angular environment configuration.

## Scripts

```bash
npm install
npm start
npm run build
npm test
```

## Development Notes

- The project uses standalone components instead of NgModules
- Dependency injection follows modern Angular style with `inject()`
- Signals are used for lightweight reactive state
- Guards and interceptors are implemented as functional APIs
- Some navigation items such as patients, appointments, and users are prepared in the sidebar config, but their feature routes/pages are not fully implemented yet in this frontend

## Build Status

- Production build is passing
- There is currently a bundle-size warning during build, but it does not block compilation

## Author

**Shaheer Asim**  
Software Engineer  
[GitHub](https://github.com/shaheerasim320)  
[LinkedIn](https://linkedin.com/in/shaheer-asim-4b08a2367)
