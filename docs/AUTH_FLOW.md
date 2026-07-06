# VoiceOS Authentication Flow & Session Protection

This document outlines the technical security design for authentication, cookie storage, and Edge-level route protection.

---

## 🔒 1. Session Life Cycle

1.  **User Log-in / Registration:** The client POSTs credentials to `/api/auth/login` or `/api/auth/signup`.
2.  **JWT Token Issuance:** The server hashes passwords, checks data repositories, signs a JWT token containing `userId`, `orgId`, and `role`, and sets a `voiceos_session` cookie.
3.  **Client Verification:** Every client page request, REST endpoint hit, or navigation checks session validity.
4.  **Logging Out:** Deletes cookie records by resetting header states.

---

## 🛡️ 2. Edge Middleware Redirections

To maximize security and reduce serverless execution costs, route validation is performed at the Edge level inside [middleware.ts](file:///C:/Users/tcpwa/ProjectOS/src/middleware.ts):

```text
               User Requests /app/*
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
     Has session cookie?    No session cookie?
             │                   │
      ┌──────┴──────┐            └─> Redirect to /login
      ▼             ▼
  Expired?        Valid?
      │             │
      ├─> Redirect  └─> Proceed to Page
      │   to /login
      ▼
  Clear Cookie
```

### 2.1 Auth Bypass Prevention
*   If an unauthenticated browser attempts to fetch any asset under `/app/*`, the middleware intercepts the header immediately and returns a `307 Temporary Redirect` redirection to `/login`.
*   If an authenticated user with a valid cookie attempts to access `/login`, `/signup`, or `/forgot-password`, they are redirected to `/app/dashboard`.
