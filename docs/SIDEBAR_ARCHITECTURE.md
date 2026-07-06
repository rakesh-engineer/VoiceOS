# VoiceOS Collapsible Sidebar Navigation Architecture

This document tracks the layout, responsiveness, and state synchronization rules of the master [app/layout.tsx](file:///C:/Users/tcpwa/ProjectOS/src/app/app/layout.tsx) template shell.

---

## 🏗️ 1. Workspace Structural Layout

The application portal is organized into a split-screen container:
*   **Sidebar Nav Container (Left Column):** Sticky vertical menu. Collapses to 80px icons-only view on desktop, and hides as a drawer overlay on mobile viewports.
*   **Workspace Content Panel (Right Column):** Flex-grow container with header navigation, organization dropdown, and dynamic children page slots.

---

## 🧭 2. Navigation Scopes

The sidebar maps the 9 primary operational routes of Sprint 3:

1.  **Dashboard:** Metric cards, activity feeds, quick actions.
2.  **AI Employees:** Configurations, role deployment forms.
3.  **Channels:** Telephony provider links, Meta WhatsApp hooks.
4.  **Knowledge Base:** Document source parsers and uploaders.
5.  **Workflows:** Automation graphs and run status telemetry.
6.  **Analytics:** Call distribution charts.
7.  **Team:** Access list and member invitations.
8.  **Organization:** Legal profile configurations.
9.  **Settings:** API key creation and billing meters.

---

## 📱 3. Responsive State Management

*   **Desktop Collapse:** Controlled via the `isCollapsed` state hook. Toggling shrinks the sidebar width from `w-64` to `w-20`, rendering only icons and setting labels as hover tooltip anchors.
*   **Mobile Drawer:** Under `768px` viewports, the sidebar disappears. Toggling the menu icon in the header slides a full-height `w-64` navigation drawer overlay into view (`isMobileOpen`).
