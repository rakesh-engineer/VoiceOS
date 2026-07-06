# VoiceOS AI Employee Config Architecture

This document tracks the UI panels, tab panels, and state validation configurations governing digital worker profiles in [ai-employees/page.tsx](file:///C:/Users/tcpwa/ProjectOS/src/app/app/ai-employees/page.tsx).

---

## 🏗️ 1. Panel Layout

The interface implements a split layout structure:
*   **Worker Registry (Left Column):** Lists all drafted/active digital worker cards. Selecting an item loads its profile details dynamically.
*   **Inspector Console (Right Column):** Tabbed details editor scoping selected worker states:
    *   `Overview`: Displays core language parameters, LLM model settings, and system prompt text summaries.
    *   `Knowledge`: Shows connected knowledge source documents and RAG state indexes.
    *   `Channels`: Mapped inbound telephone lines and WhatsApp adapters.
    *   `Analytics`: Scopes calls resolved, average sentiment, and escalations.
    *   `Configuration`: Scopes JSON-level configuration parameters.

---

## 🛠️ 2. Deploying a New Digital Worker

Clicking **Deploy Worker** opens a dialog capturing:
*   `Name` (e.g. Sarah)
*   `Role Title` (e.g. Lead Qualifier)
*   `LLM Model` (GPT-4o, Gemini Flash, Claude Haiku)
*   `Temperature` (0.0 to 1.0)
*   `System Prompt` (The core behavior template)

On submit, the payload routes to POST `/api/employees` where:
1.  **RBAC Verification:** Verifies the user has `Developer` status or higher.
2.  **Organization Mapping:** Binds the record to the active `organization_id` and first workspace id.
3.  **Data Storage:** Inserts row into Postgres `ai_employees` table.
4.  **UI Refresh:** Re-loads the registries list.
