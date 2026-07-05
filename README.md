# VoiceOS - Autonomous Enterprise AI Voice Platform

VoiceOS is an enterprise-grade AI voice platform built for high-throughput, low-latency communication automation. It behaves as a virtual digital employee, answering calls 24/7, resolving queries using custom RAG (Retrieval-Augmented Generation), scoring leads, scheduling appointments, updating CRM platforms, and executing custom n8n workflow sequences.

This repository hosts the Next.js landing page, local service layers, and components for VoiceOS.

---

## 🏗️ Folder Structure

The project follows a clean, modular production directory structure:

```text
ProjectOS/
├── src/
│   ├── app/                      # Next.js App Router (Routing, Layouts, global CSS)
│   │   ├── globals.css           # Tailwind v4 configuration and theme imports
│   │   ├── layout.tsx            # Main layout with configured SEO metadata
│   │   └── page.tsx              # Assembled landing page sections
│   ├── components/               # Reusable Modular UI Components
│   │   ├── Navbar.tsx            # Sticky glassmorphism header & responsive mobile drawer
│   │   ├── Hero.tsx              # Animated hero section with interactive call simulator
│   │   ├── Problem.tsx           # Industry challenges layout with customized metric stats
│   │   ├── Solution.tsx          # Step-by-step description of the VoiceOS response model
│   │   ├── Features.tsx          # Detailed grid highlighting the 10 core product modules
│   │   ├── Architecture.tsx      # SVG workflow pipeline showing Call -> n8n -> CRM
│   │   ├── Industries.tsx        # Vertical-specific tabs (Real Estate, Healthcare, etc.)
│   │   ├── WhyVoiceOS.tsx        # Comparative matrix: Traditional Support vs VoiceOS
│   │   ├── DemoForm.tsx          # Fully validated request form with loading/success states
│   │   └── Footer.tsx            # Navigation links, contact info, LinkedIn external hook
│   ├── lib/
│   │   └── api.ts                # Base apiRequest client connecting to webhooks
│   └── services/
│       └── demoService.ts        # Business logic dispatcher for demo request submissions
├── public/                       # Static public assets (Favicon, icons, illustrations)
├── tsconfig.json                 # TypeScript compiler configuration (includes @/* alias)
├── package.json                  # Dependencies (Next 16, React 19, Tailwind v4, Lucide)
└── README.md                     # Startup developer guide (this file)
```

---

## ⚡ Running Locally

Follow these steps to set up and run the VoiceOS portal locally on your system:

### 1. Prerequisites
Ensure you have **Node.js (v18.0 or later)** and **npm** installed on your local computer.

### 2. Install Dependencies
Run the following command in your terminal:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root of the workspace directory:
```bash
# n8n Webhook URLs
NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL="https://your-n8n-instance.com/webhook/voice-os-demo"
```
*Note: If these variables are not defined, the service layer will automatically log request payloads to the console and simulate network success locally, ensuring continuous front-end development without breaking.*

### 4. Run Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

### 5. Check Production Build
Validate that TypeScript and Next.js compile properly:
```bash
npm run build
```

---

## 🚀 Deploying to Vercel

The portal is pre-configured and fully compatible with single-click deployments on Vercel:

### Option A: Via Vercel CLI (Recommended for fast tests)
1. Install the Vercel CLI globally: `npm install -g vercel`
2. Run `vercel` in the root of the directory:
   ```bash
   vercel
   ```
3. Follow the interactive prompts to link and deploy your project.
4. Set up env variables (`NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL`) inside the Vercel project settings dashboard.
5. Push changes to production:
   ```bash
   vercel --prod
   ```

### Option B: Via GitHub Integration (Recommended for CI/CD)
1. Push this workspace code to a private GitHub repository.
2. Log into [Vercel](https://vercel.com) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. In the **Environment Variables** accordion, add:
   * Key: `NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL`
   * Value: `<your_n8n_production_webhook_uri>`
5. Click **Deploy**. Vercel will build and assign a production URL to your landing page on every push to the `main` branch.

---

## 🔌 Connecting to n8n Webhook

1. Create a new workflow in your **n8n** instance.
2. Add a **Webhook node** set to:
   * Method: `POST`
   * Path: `voice-os-demo`
   * Respond: `Immediately (200 OK)`
3. Connect the Webhook node outputs to:
   * **HubSpot/Salesforce Node** (to create/update lead contact record)
   * **WhatsApp/Twilio Node** (to dispatch follow-up notifications)
   * **Gmail/Slack Node** (to notify your founders about the new lead request)
4. Set the Webhook URL in your environment variables to link the forms dynamically.
