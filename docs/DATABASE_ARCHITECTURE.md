# VoiceOS Database Architecture

This document details the PostgreSQL database design for the VoiceOS SaaS platform, mapping out all tables, constraints, keys, indices, and entity relationships.

---

## 💾 1. Entity Relationship Diagram (ERD)

The database schema is organized around a multi-tenant hierarchy starting at the **Organization** level:

```text
organizations (1) ───< workspaces (N)
     │                     │
     │                     └───< ai_employees (N) ───< channel_assignments (N)
     │                                                     │
     ├───< memberships (N) ───> users (1)                  │
     │                                                     │
     ├───< channels (N) <──────────────────────────────────┘
     │
     ├───< conversation_logs (N) ───< message_exchanges (N)
     │          │
     │          ├───< calls (1)
     │          └───< workflow_executions (N)
     │
     ├───< api_keys (N)
     ├───< audit_logs (N)
     └───< subscriptions (1) ───< billing_records (N)
```

---

## 📋 2. Tables Schema Dictionary

### 2.1 Multi-Tenant Core Group
*   **`organizations`**: Holds company accounts. All tenants get a unique UUID primary key and slug namespace.
*   **`workspaces`**: Enables organizations to partition their agents and settings by team, campaign, or department (e.g. Sales workspace vs. Support workspace).
*   **`users`**: Contains account credentials (email and password hashes).
*   **`memberships`**: Connects Users to Organizations with a specific role: `Owner`, `Admin`, `Developer`, `Operator`, or `Viewer`.
*   **`invitations`**: Tracks invitations sent to invite new colleagues to join a specific tenant organization.

### 2.2 AI Employee Config & Knowledge Store
*   **`ai_employees`**: Stores profiles of digital workers (e.g., name, model, prompt configurations, and status).
*   **`knowledge_sources`**: Groups vector indexes, database hook specifications, or static document sources.
*   **`documents`**: Holds the parsed document text chunks, metadata, and references to vector storage.

### 2.3 Integration & Channels
*   **`channels`**: Stores configurations for communication interfaces (e.g. Twilio API credentials, webhook tokens, or email servers).
*   **`channel_assignments`**: Links specific AI employees to communication channels (so Sarah answers calls to a specific Twilio phone number).

### 2.4 Logs, Telemetry & Security
*   **`conversation_logs`**: Logs all conversations (call duration, summaries, sentiment analysis).
*   **`message_exchanges`**: Logs individual message lines between customer and AI for debugging and training.
*   **`calls`**: Specific telephony parameters (Call SID, audio recording URL, status).
*   **`workflow_executions`**: Tracks integration webhook execution logs for audit compliance.
*   **`audit_logs`**: Immutable security record tracking user configurations.
*   **`api_keys`**: Manages developers API tokens.

### 2.5 SaaS Monetization (Stripe Ready)
*   **`subscriptions`**: Maps active Stripe subscription references, active pricing tier, and billing periods.
*   **`billing_records`**: Stores invoices metadata and payment transaction statuses.

---

## ⚡ 3. Indices & Query Optimizations

To support thousands of organizations and sub-millisecond API lookups, indexes are established on query filters:
1.  **Multi-Tenant Isolation Filters:** Index on `organization_id` on all major tables to ensure instant lookups inside organization boundaries.
2.  **API Key Authentications:** Unique hash index on `api_keys(key_hash)` to validate incoming API requests.
3.  **Logs Queries:** Indexes on `conversation_logs(organization_id)` and `message_exchanges(conversation_id)` for high-throughput dashboard telemetry display.
