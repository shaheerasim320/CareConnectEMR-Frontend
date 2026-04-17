# 🏥 CareConnect EMR



CareConnect EMR is a modern **Healthcare / Electronic Medical Records (EMR)** frontend built with **Angular 20**, Angular Material, and a scalable enterprise-grade architecture.  

It integrates with a **.NET backend API** for authentication, patient management, appointments, and role-based access control.



---



## 🚀 Tech Stack



- Angular 20 (Standalone Architecture)

- Angular Material UI

- RxJS

- Signals (Reactive State Management)

- SCSS (Custom Theming)

- JWT Authentication (Access + Refresh Tokens)

- .NET Web API Backend

- Role-Based Access Control (RBAC)



---



## 📁 Project Architecture

src/app/

│

├── core/

│ ├── services/ # Auth, API services

│ ├── guards/ # AuthGuard, GuestGuard

│ ├── interceptors/ # JWT + Error handling

│ ├── models/ # Interfaces / DTOs

│

├── features/

│ ├── auth/ # Login module

│ ├── dashboard/ # Main dashboard

│ ├── patients/ # Patient management

│ ├── appointments/ # Appointment system

│ ├── users/ # Admin user management

│

├── layout/

│ ├── shell/ # Main app layout

│ ├── sidebar/

│ └── header/

│

├── shared/

│ ├── components/ # Reusable UI components

│ └── pipes/ # Utility pipes



---



## ⚙️ Features



### 🔐 Authentication

- JWT Login (Access + Refresh Token)

- Auto token refresh (silent login)

- Secure HTTP-only API integration

- Guest Guard (prevents logged-in users from seeing login page)



### 🛡️ Route Protection

- Auth Guard (protects private routes)

- Role-based access ready (Admin, Doctor, Nurse, Staff)



### 🧠 State Management

- Angular Signals for reactive user state

- Centralized Auth Service



### 💉 Healthcare Modules

- Patient Management

- Appointment Scheduling

- User Administration (RBAC ready)



---



## 🧪 Development Server



Run local development server:



```bash
ng serve
```

Navigate to:



http://localhost:4200/

The app auto reloads on file changes.

## 🧱 Code Generation

Generate Angular artifacts:


```
ng generate component component-name

ng generate service service-name

ng generate guard guard-name
```

## 📦 Build Project

Production build:


```
ng build
```
Output:
```
dist/
```

Optimized for performance and deployment.

## 🧪 Testing

Unit Tests

```
ng test
```

E2E Tests
```
ng e2e
```

## 🔐 Authentication Flow

Access Token
   ↓
Stored in memory (Angular service)

Refresh Token
   ↓
Stored in HttpOnly Cookie

Interceptor
   ↓
Adds Authorization header

401
   ↓
refresh-token endpoint
   ↓
retry request

## 🧠 Key Architecture Patterns

- Standalone Components

- Functional Guards (CanActivateFn)

- Functional Interceptors (HttpInterceptorFn)

- Reactive Forms

- Signal-based State Management

## 🌐 Backend Integration

This frontend connects to a .NET Web API:



Auth Endpoints
```
POST /api/Auth/login

POST /api/Auth/refresh-token

POST /api/Auth/logout

GET  /api/Auth/me
```

## 👥 Roles (RBAC Ready)

Admin

Doctor

Receptionist



## 📌 Future Enhancements

- Real-time notifications

- Audit logs

- Advanced patient analytics

- File upload system (medical reports)

- WebSocket support for live updates
## 👨‍💻 Developer Notes

- Use inject() instead of constructors (modern Angular style)

- Keep services in core/

- Use interceptors for API concerns

- Keep UI logic inside features/

## 🏥 Project Goal

To build a scalable, production-grade EMR system similar to modern hospital systems with:



- Secure authentication

- Role-based workflows

- Clean UI/UX using Angular Material

- Maintainable architecture for long-term scaling

## 📄 License

This project is for educational and professional development purposes.

## 👨‍💻 Author

**Shaheer Asim**  
Software Engineer — .NET · Angular · SQL Server  
[GitHub](https://github.com/shaheerasim320) · [LinkedIn](https://linkedin.com/in/shaheer-asim-4b08a2367)