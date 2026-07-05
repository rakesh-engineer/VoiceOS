# VoiceOS - Production Deployment Guide

This document outlines the standard operating procedures for building, optimizing, and deploying the VoiceOS landing page and API middleware in production.

---

## 1. Hosting Environment: Vercel

VoiceOS is fully optimized to run on the Vercel edge runtime, utilizing Next.js static generation combined with serverless route handlers for secure API proxying.

### 1.1 Vercel Project Configuration

When importing this repository into the Vercel dashboard, verify that the following build settings are set:

*   **Build Command:** `npm run build` (resolves to `next build`)
*   **Install Command:** `npm install` (or `npm ci` for strict lockfile installs in CI/CD environments)
*   **Output Directory:** `.next` (automatically detected by Vercel)
*   **Node.js Version:** `20.x` (or newer LTS)

### 1.2 Environment Variables Config

Ensure all required production environment variables listed in [Environment Variables.md](file:///C:/Users/tcpwa/ProjectOS/docs/Environment%20Variables.md) are added under the Vercel Project Settings > **Environment Variables** tab before deploying.

---

## 2. Manual CLI Deployment

For rapid validation in staging, utilize the Vercel CLI:

1.  **Install Vercel CLI:**
    ```bash
    npm install -g vercel
    ```
2.  **Authenticate & Link Project:**
    Run `vercel` from the root directory:
    ```bash
    vercel
    ```
    Follow the prompts to link the project to your organization and set staging environment values.
3.  **Deploy to Production:**
    ```bash
    vercel --prod
    ```

---

## 3. Production Build Validation

Always validate compilation, typescript checks, and lint rules locally or in CI before pushing to the main branch:

```bash
# 1. Type-check
npm run type-check

# 2. Lint
npm run lint

# 3. Compile Production Bundle
npm run build
```

---

## 4. Next.js Optimizations

VoiceOS incorporates the following Next.js production optimizations:

*   **Asset Compression & Prerendering:** Pages like `/` are pre-rendered into static HTML (`prerendered as static content`) during the build step, reducing Time to First Byte (TTFB).
*   **Font Subsetting:** Google Font definitions (`Geist` and `Geist Mono`) are automatically subset and self-hosted via `next/font` to eliminate layout shifts (CLS) and secondary network request latency.
*   **Metadata Integration:** The global metadata (SEO title, description, OG tags) is configured dynamically via the central config mapping in [layout.tsx](file:///C:/Users/tcpwa/ProjectOS/src/app/layout.tsx), ensuring indexability.
*   **API Security Proxy:** Form submissions route through Next.js Route Handlers to mask external workflow URLs and restrict webhook exposure.
