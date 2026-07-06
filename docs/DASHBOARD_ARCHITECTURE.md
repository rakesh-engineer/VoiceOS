# VoiceOS Dashboard Panel Architecture

This document tracks the layout modules, analytical widgets, telemetry cards, and action panels integrated in the central [dashboard/page.tsx](file:///C:/Users/tcpwa/ProjectOS/src/app/app/dashboard/page.tsx) interface.

---

## 🏗️ 1. Panel Layout Grid

The dashboard layout partitions telemetry cards and task blocks across a responsive grid:

```text
┌─────────────────────────────────────────────────────────────┐
│                       Welcome Banner                        │
├─────────────────────────────────────────────────────────────┤
│                    Operational KPI Cards                    │
│ [AI Employees] [Active Channels] [Calls] [Messages] [Runs]  │
├───────────────────────────────┬─────────────────────────────┤
│                               │                             │
│     Operational Events Log    │        Quick Actions        │
│       (Timeline Feed)         │                             │
│                               ├─────────────────────────────┤
│                               │      Dev Alert Banner       │
└───────────────────────────────┴─────────────────────────────┘
```

---

## 📊 2. Operational KPIs Details

*   **AI Employees deployed:** Displays counts of AI workers drafted/activated within the workspace.
*   **Active Channels:** Active telephonic numbers and WhatsApp lines.
*   **Today's Call Engagements:** Counts of voice call requests received.
*   **Today's Messages:** Text traffic counts.
*   **Workflow Actions Run:** Automation counts processed by connected adapters (e.g. n8n).

---

## 📜 3. Events Timeline Synchronization

The dashboard displays a real-time chronological list of system actions (e.g. call completions, prompt updates, database syncs, webhook failures). In Phase 2, this feed connects to the Postgres `audit_logs` and `conversation_logs` tables via server-sent events (SSE) to update in real-time.
