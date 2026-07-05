# VoiceOS - Engineering Roadmap & Future Sprints

This document outlines the engineering plan for Sprints 2 through 5. It focuses purely on technical tasks, architectural layers, and foundational components necessary to transform the VoiceOS landing page mockups into an enterprise-grade platform.

---

## 🏃 Sprint 2: Core Platform API, Auth, & n8n Dynamic Routing

**Focus:** Establish backend APIs, authentication boundaries, and the n8n execution controller.

*   **Task 2.1: Authentication & RBAC Setup**
    *   Integrate NextAuth.js or Clerk for secure client dashboard authentication.
    *   Configure Role-Based Access Control (RBAC) levels: `SuperAdmin`, `TenantAdmin`, `Agent`.
*   **Task 2.2: Database Layer Initialization**
    *   Deploy PostgreSQL instance (Supabase/Prisma ORM).
    *   Design schema database migrations for `Tenants`, `Campaigns`, `CallLogs`, and `LeadScores`.
*   **Task 2.3: n8n Bidirectional Integration Hub**
    *   Create server route handlers under `/api/workflows` to interface with the n8n webhook API.
    *   Develop HMAC signature validation filters to verify that incoming webhook payloads originate from authorized n8n instances only.
*   **Task 2.4: Lead Scoring Queue Worker**
    *   Implement Redis/BullMQ background queue processors to score leads asynchronously post-call, reducing main HTTP thread delays.

---

## 🏃 Sprint 3: Dynamic Knowledge Retrieval (RAG) & Vector DB

**Focus:** Build the knowledge retrieval system and document processing pipelines.

*   **Task 3.1: Document Ingestion Pipeline**
    *   Develop `/api/knowledge/upload` to parse incoming PDFs, DOCX, and website URLs.
    *   Configure document chunking text splitters (using LangChain or custom token boundaries).
*   **Task 3.2: Vector Store Setup**
    *   Deploy pgvector (or Pinecone/Qdrant) instance for semantic vector space indexing.
    *   Hook up OpenAI `text-embedding-3-small` embedder to convert document chunks into vectors.
*   **Task 3.3: Semantic Search Retrieval Route**
    *   Build a fast RAG retrieval API that performs cosine similarity queries against the vector store.
    *   Add metadata filters to restrict search bounds to the caller's specific tenant ID.

---

## 🏃 Sprint 4: SIP/Telephony Integration & Real-time TTS/ASR Gateway

**Focus:** Establish real-time voice channels, SIP endpoints, and low-latency audio streaming.

*   **Task 4.1: Twilio / Vonage Webhook Gateway**
    *   Implement WebSocket servers (`/api/streams/audio`) utilizing Node.js or Next.js custom server adapters.
    *   Orchestrate standard Twilio Media Streams to receive raw µ-law/A-law audio packets.
*   **Task 4.2: Real-time ASR (Speech-to-Text) Pipeline**
    *   Integrate Deepgram (or Whisper Live) streaming SDK via WebSocket channels.
    *   Implement Voice Activity Detection (VAD) buffers to segment caller pauses and prevent agent interruptions.
*   **Task 4.3: LLM Dialect Orchestrator**
    *   Implement server streaming loops using OpenAI GPT-4o (or Gemini Flash) with custom prompt engineering rules for phone conversations.
    *   Configure streaming back to TTS servers to minimize Time-to-First-Byte (TTFB).
*   **Task 4.4: Ultra-Realistic TTS (Text-to-Speech) System**
    *   Connect ElevenLabs or Cartesia WebSocket endpoints to convert text strings to raw PCM audio.
    *   Stream response audio back to the Twilio active SIP call.

---

## 🏃 Sprint 5: Analytics Cockpit, Monitoring, & SLA Readiness

**Focus:** Complete dashboards, system monitoring logs, rate-limiting, and SLA setups.

*   **Task 5.1: Real-Time Call Event Socket**
    *   Deploy Socket.io or Supabase Realtime handlers to push active transcript lines and call indicators to agent dashboards.
*   **Task 5.2: Analytics Visualizer Metrics**
    *   Implement database aggregators (average talk time, sentiment analysis scores, cost-per-call metrics, and conversion rates).
    *   Create dashboard panels utilizing Tremor or Recharts components.
*   **Task 5.3: Security Audits & Rate-Limiting**
    *   Configure Upstash Rate-Limiting middleware on all `/api/*` routes.
    *   Set up automated database encryption for PII (Personally Identifiable Information) like phone numbers and raw transcripts.
*   **Task 5.4: Logging & OpenTelemetry Instrumentation**
    *   Instrument critical audio paths with OpenTelemetry metrics.
    *   Route logs to Datadog, Axiom, or Sentry for anomaly alerting and audio latency monitoring.
