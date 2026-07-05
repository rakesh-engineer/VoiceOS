# VoiceOS - Production Release Checklist

This checklist must be executed and fully checked off by the Lead Release Manager and Devops Architect prior to launching VoiceOS v1.0.0 (or any subsequent minor/major release) to the public.

---

## 🗂️ 1. Code Quality & Compilation
- [ ] **Lint Validation:** Run `npm run lint` and verify there are zero ESLint errors or warnings.
- [ ] **Type-check Verification:** Run `npm run type-check` and ensure the TypeScript compiler returns zero compilation errors.
- [ ] **Production Build:** Run `npm run build` and ensure Next.js outputs a production bundle without warnings.
- [ ] **Dead Code Check:** Verify there are no unused imports, obsolete helper scripts, or debug assets (e.g. standard Next.js SVG template graphics) committed.
- [ ] **Dependency Audit:** Verify `package.json` contains no unused packages.

---

## 🔒 2. Security Configuration
- [ ] **API Proxy Protection:** Confirm that the intake form dispatches to `/api/demo` rather than directly executing external n8n hook URLs in client browsers.
- [ ] **Server-side Validation:** Ensure `/api/demo` sanitizes parameters (email regex check, presence of required text variables, honeypot validation for spam protection).
- [ ] **Credential Leakage Prevention:** Verify that `.env` files are ignored in [.gitignore](file:///C:/Users/tcpwa/ProjectOS/.gitignore) and that no secrets are committed to the git tree.
- [ ] **CORS Settings:** Ensure n8n and database hosts restrict incoming fetch queries to the origin URL `NEXT_PUBLIC_SITE_URL` once published.
- [ ] **HTTPS Enforced:** Confirm that Vercel is set to auto-forward all HTTP traffic to HTTPS.

---

## 🔍 3. Search Engine Optimization (SEO)
- [ ] **Dynamic Metadata:** Confirm that metadata (title, description, open graph fields, twitter cards) is mapped to configurations in [layout.tsx](file:///C:/Users/tcpwa/ProjectOS/src/app/layout.tsx).
- [ ] **JSON-LD Schema:** Verify search crawlers can index the `SoftwareApplication` structured schema injected in the HTML header.
- [ ] **Canonical URL:** Verify that `NEXT_PUBLIC_SITE_URL` is set to the correct custom domain (e.g., `https://voiceos.ai`).
- [ ] **Favicon Config:** Ensure `favicon.ico` is present in the `src/app/` route for browser icons.

---

## ♿ 4. Accessibility (a11y)
- [ ] **Aria Labels:** Verify that all interactive control items (mobile drawer buttons, scroll-to-top buttons) utilize clear, human-readable `aria-label` tags.
- [ ] **Contrast Compliance:** Review colors using WCAG tools to confirm that grey/violet elements on dark backgrounds comply with AA/AAA requirements.
- [ ] **Semantic Elements:** Confirm layout elements are grouped under standard HTML5 structural tags: `<header>`, `<main>`, `<section>`, and `<footer>`.
- [ ] **Focus Rings:** Ensure keyboard-based navigation users see outlines (`focus:ring-2`) on buttons and intake forms.

---

## ⚡ 5. Performance Optimization
- [ ] **Static Generation:** Confirm Next.js compiles page routers as static files during the build phase (`prerendered as static content`).
- [ ] **Self-hosted Fonts:** Ensure Google Web Fonts (`Geist` family) are loaded using standard Next.js packages (`next/font/google`) to prevent Cumulative Layout Shift (CLS).
- [ ] **Asset Minification:** Ensure SVG assets inside the repo are optimized and compressed.
- [ ] **Build Cache:** Verify Vercel caches compilation layers between builds to speed up deployment times.

---

## 🌐 6. Domain & DNS Management
- [ ] **Domain Mapping:** Link the custom domain (e.g., `voiceos.ai`) to Vercel project settings.
- [ ] **DNS Records:** Configure CNAME and A records at the registrar (e.g. Cloudflare, Namecheap) pointing to Vercel's edge network IPs.
- [ ] **SSL Certification:** Verify that Let's Encrypt (provided automatically by Vercel) successfully issues and binds an SSL certificate to the custom domain.
- [ ] **Apex Redirect:** Ensure the apex domain (`voiceos.ai`) automatically redirects to the subdomain (`www.voiceos.ai`) or vice versa, based on preference.

---

## 📈 7. Analytics & Conversion Tracking
- [ ] **Event Tagging:** Ensure custom event trackers (e.g., Google Analytics 4, Plausible, or Mixpanel) are loaded via lightweight script tags.
- [ ] **Intake Form Tracking:** Verify that successful submissions of `DemoForm` trigger analytics tags to record lead acquisition conversions.
- [ ] **Privacy Consent:** In corporate jurisdictions (GDPR/CCPA), verify that analytics cookie consent banners load prior to tracking users.

---

## 🖥️ 8. Monitoring & Error Alerting
- [ ] **Runtime Logging:** Connect serverless execution logs to an external logging hub (e.g. Datadog, Logtail) to track server-side errors on `/api/demo`.
- [ ] **Frontend Crash Reporting:** Integrate Sentry or LogRocket in the root file to capture client-side React exceptions.
- [ ] **Uptime Pingers:** Configure monitoring services (e.g., UptimeRobot, Better Stack) to ping the landing page every 60 seconds.
- [ ] **SSL Expiry Monitoring:** Set up alerts to trigger if SSL validation certificates fail to auto-renew.

---

## 💾 9. Backups & Disaster Recovery
- [ ] **Repository Mirroring:** Confirm the GitHub codebase is mirrored or synced to a secondary repository host (e.g. GitLab or Bitbucket) in case of system downtime.
- [ ] **Database Versioning:** Ensure any database schemas (e.g., lead data tables) are fully backed up on a daily snapshot cycle.
- [ ] **n8n Workflows Export:** Ensure active backend workflows are saved as JSON files and checked into a secure corporate storage vault.
