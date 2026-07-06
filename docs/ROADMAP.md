# VoiceOS Product & Engineering Roadmap

This document outlines the 5-year roadmap for VoiceOS as an Enterprise AI Operating System SaaS platform.

---

## 📈 1. Phased Product Timeline

```text
  Phase 1 (Sprint 2)    ──>   Phase 2 (Sprint 3-4)   ──>   Phase 3 (Sprint 5)    ──>   Phase 4 (Year 2)     ──>   Phase 5 (Year 3+)
┌────────────────────┐      ┌────────────────────┐      ┌────────────────────┐      ┌────────────────────┐      ┌────────────────────┐
│   SaaS Platform    │      │ Telephony Gateway  │      │   Dynamic RAG &    │      │    Omnichannel     │      │ SaaS Billing, SSO  │
│     Foundation     │      │ & Voice Streaming  │      │  pgvector Index    │      │     Expansion      │      │  & Enterprise SLA  │
└────────────────────┘      └────────────────────┘      └────────────────────┘      └────────────────────┘      └────────────────────┘
```

---

## 🏗️ 2. Detailed Technical Phases

### Phase 1: Platform Foundation (Current Release)
*   Deploy core SaaS multi-tenant tables.
*   Enforce server-side session authentication with JWT and RBAC.
*   Build data repository layers mapping database interfaces.
*   De-couple workflow trigger layers from specific engines.

### Phase 2: Telephony Integration & Audio Gateway
*   Establish WebSocket connections (`/api/streams/audio`) to receive raw telephony audio.
*   Integrate Twilio Media Streams and Vonage Voice APIs.
*   Implement Speech-to-Text (ASR) via Deepgram streaming WebSockets.
*   Implement Text-to-Speech (TTS) low-latency connections via Cartesia and ElevenLabs.
*   Develop Voice Activity Detection (VAD) algorithms to manage conversation turn-taking.

### Phase 3: Dynamic Retrieval (RAG) & Vector Database
*   Utilize `pgvector` extension inside PostgreSQL to host semantic text embeddings.
*   Implement document processing splitters supporting incoming PDFs, spreadsheets, and Web URLs.
*   Generate text embeddings dynamically via OpenAI or Cohere embedding interfaces.
*   Integrate vector semantic searches into the LLM conversation loop to fetch real-time policy guidelines.

### Phase 4: Omnichannel Expansion
*   Add assignable channel configurations for:
    *   **WhatsApp:** Official Business API integrations.
    *   **Chat:** Embedded website customer support widgets.
    *   **Email:** Automated outbound email follow-ups.
*   Enable single-agent multi-channel memory sharing (customer profile persistence across SMS, Voice, and Email).

### Phase 5: Monetization, SSO, & Monitoring
*   Connect Stripe Billing for dynamic, usage-based subscription tiers.
*   Deploy Okta / Microsoft Entra ID SAML 2.0 Single Sign-On (SSO) directory sync.
*   Instrument critical audio pipelines with OpenTelemetry tracking for Datadog dashboards.
