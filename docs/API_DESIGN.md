# VoiceOS REST API Design Specifications

This document outlines the API route contracts, payload parameters, headers, and status codes for the core SaaS foundation.

---

## 🔐 1. Authentication Endpoints

### 1.1 `POST /api/auth/signup`
Creates a new tenant user account and registers their organization.

*   **Request Headers:** `Content-Type: application/json`
*   **Request Body:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@acme.com",
      "password": "supersecretpassword123",
      "companyName": "Acme Inc."
    }
    ```
*   **Response (200 OK):**
    *   *Sets HTTP-Only Cookie:* `voiceos_session`
    ```json
    {
      "success": true,
      "data": {
        "user": {
          "id": "usr_9a8f23bc5",
          "email": "jane@acme.com",
          "name": "Jane Doe",
          "createdAt": "2026-07-06T18:30:00Z",
          "updatedAt": "2026-07-06T18:30:00Z"
        },
        "org": {
          "id": "org_5d3e12fa4",
          "name": "Acme Inc.",
          "slug": "acme-inc",
          "createdAt": "2026-07-06T18:30:00Z",
          "updatedAt": "2026-07-06T18:30:00Z"
        }
      },
      "timestamp": "2026-07-06T18:30:01Z"
    }
    ```

### 1.2 `POST /api/auth/login`
Authenticates credentials and establishes session parameters.

*   **Request Body:**
    ```json
    {
      "email": "jane@acme.com",
      "password": "supersecretpassword123"
    }
    ```
*   **Response (200 OK):**
    *   *Sets HTTP-Only Cookie:* `voiceos_session`
    ```json
    {
      "success": true,
      "data": {
        "user": { "id": "usr_9a8f23bc5", "email": "jane@acme.com", "name": "Jane Doe" },
        "org": { "id": "org_5d3e12fa4", "name": "Acme Inc.", "slug": "acme-inc" },
        "role": "Owner"
      },
      "timestamp": "2026-07-06T18:32:00Z"
    }
    ```

---

## 🗂️ 2. Organizations & Workspaces

### 2.1 `GET /api/orgs`
Retrieves workspaces and memberships scoped to the active organization.

*   **Cookies required:** `voiceos_session`
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "organization": { "id": "org_5d3e12fa4", "name": "Acme Inc.", "slug": "acme-inc" },
        "workspaces": [
          { "id": "ws_1a2b3c4d5", "organizationId": "org_5d3e12fa4", "name": "Sales Outbound", "slug": "sales" }
        ],
        "members": [
          { "userId": "usr_9a8f23bc5", "name": "Jane Doe", "email": "jane@acme.com", "role": "Owner" }
        ]
      },
      "timestamp": "2026-07-06T18:35:00Z"
    }
    ```

---

## 🤖 3. AI Employee Configs

### 3.1 `GET /api/employees`
Lists all active digital employee profiles mapped to the active organization.

*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "emp_0a1b2c3d4",
          "organizationId": "org_5d3e12fa4",
          "workspaceId": "ws_1a2b3c4d5",
          "name": "Sarah",
          "roleTitle": "Enterprise Outbound Representative",
          "status": "Active",
          "llmModel": "gpt-4o",
          "systemPrompt": "You are Sarah...",
          "temperature": 0.70,
          "createdAt": "2026-07-06T18:35:00Z",
          "updatedAt": "2026-07-06T18:35:00Z"
        }
      ],
      "timestamp": "2026-07-06T18:40:00Z"
    }
    ```

### 3.2 `POST /api/employees`
Deploys a new AI worker card. Requires **Developer** privileges.

*   **Request Body:**
    ```json
    {
      "name": "David",
      "roleTitle": "Healthcare Intake Agent",
      "systemPrompt": "You are David...",
      "temperature": 0.50,
      "llmModel": "gemini-1.5-flash"
    }
    ```
*   **Response (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "id": "emp_new_uuid_12",
        "organizationId": "org_5d3e12fa4",
        "workspaceId": "ws_1a2b3c4d5",
        "name": "David",
        "roleTitle": "Healthcare Intake Agent",
        "status": "Draft",
        "llmModel": "gemini-1.5-flash",
        "systemPrompt": "You are David...",
        "temperature": 0.50,
        "createdAt": "2026-07-06T18:42:00Z",
        "updatedAt": "2026-07-06T18:42:00Z"
      },
      "timestamp": "2026-07-06T18:42:01Z"
    }
    ```
