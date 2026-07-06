# VoiceOS Authentication & Authorization Blueprint

This document specifies the technical design for user authentication, session security, role definitions, and the Single Sign-On (SSO) roadmap.

---

## 🔑 1. Session Strategy: HTTP-Only Cookies

VoiceOS utilizes state-of-the-box tokenized session validations. On login/signup, the server signs a cryptographic JWT token and appends it to the HTTP response header as a secure cookie:

*   **Cookie Name:** `voiceos_session`
*   **Attributes:**
    *   `HttpOnly`: Restricts access from JavaScript (prevents Cross-Site Scripting (XSS) token extraction).
    *   `Secure`: Enforced to `true` in production to restrict cookie transmission to HTTPS channels only.
    *   `SameSite: Lax`: Prevents Cross-Site Request Forgery (CSRF) on third-party links while preserving navigation contexts.
    *   `Max-Age`: `86400` (1-day session timeout).

---

## 🔐 2. JWT Token Structure

The JWT token contains:
```json
{
  "userId": "usr_uuid_value",
  "email": "developer@voiceos.ai",
  "orgId": "org_uuid_value",
  "role": "Developer",
  "iat": 1783360000,
  "exp": 1783446400
}
```

Authentication is validated on the server edge. Decryption handles:
1.  **Signature Verification:** Checks if the signature matches the local `JWT_SECRET`.
2.  **Expiration Check:** Discards requests if `now` exceeds `exp` values.

---

## 🛡️ 3. Role-Based Access Control (RBAC) System

VoiceOS maps users to roles. Roles have hierarchical scopes:

```text
Owner (All rights + Billing + Invites)
  ↳ Admin (Workspaces configs + Invites)
      ↳ Developer (Prompts, models configurations, workflows setup)
          ↳ Operator (Toggle Active status, edit basic prompt strings)
              ↳ Viewer (Read-only call logs dashboard panels)
```

Roles are checked programmatically in route handlers:
```typescript
const isAuthorized = authService.hasRoleRequired(session.role, 'Developer');
if (!isAuthorized) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
```

---

## 🚀 4. SSO Integration Roadmap

To support enterprise clients, VoiceOS will expand its authentication layer in Phase 2 to support Federated Identity Providers:

*   **OpenID Connect (OIDC):** Integration with Okta, Microsoft Entra ID, and Google Workspace.
*   **SAML 2.0:** Support XML-based assertion exchanges for enterprise directory sync.
*   **SAML Routing JIT:** When a user logs in via `/api/auth/sso`, the server reads their email domain, fetches their organization’s SSO identity provider configuration, redirects them for assertion, and performs Just-In-Time (JIT) provisioning.
