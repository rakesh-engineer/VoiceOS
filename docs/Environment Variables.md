# VoiceOS - Environment Variables Documentation

VoiceOS utilizes environment variables to manage configurations across local, staging, and production hosting environments. This ensures the application codebase is portable and free of hardcoded paths or contact details.

---

## 1. Directory of Configurations

The following variables are centralized inside [src/config/index.ts](file:///C:/Users/tcpwa/ProjectOS/src/config/index.ts):

### 1.1 Brand Configurations
*   **`NEXT_PUBLIC_APP_NAME`**
    *   *Type:* String
    *   *Default:* `"VoiceOS"`
    *   *Description:* The user-facing name of the platform. Used in navigation branding, footers, page titles, and SEO metadata.
*   **`NEXT_PUBLIC_APP_DESCRIPTION`**
    *   *Type:* String
    *   *Default:* `"Autonomous Enterprise AI Voice Platform"`
    *   *Description:* High-level summary of the product. Injected into meta descriptions and structured JSON-LD data.
*   **`NEXT_PUBLIC_COMPANY_NAME`**
    *   *Type:* String
    *   *Default:* `"VoiceOS Inc."`
    *   *Description:* Legal entity name used in the copyright footer line.
*   **`NEXT_PUBLIC_CONTACT_EMAIL`**
    *   *Type:* Email string
    *   *Default:* `"hello@voiceos.ai"`
    *   *Description:* Contact point address. Renders dynamically in email mailto links in the footer.
*   **`NEXT_PUBLIC_SITE_URL`**
    *   *Type:* URL string
    *   *Default:* `"https://voiceos.ai"`
    *   *Description:* Production address of the landing page. Required for Google search metadata canonical tags.
*   **`NEXT_PUBLIC_LINKEDIN_URL`**
    *   *Type:* URL string
    *   *Default:* `"https://linkedin.com/company/voiceos"`
    *   *Description:* Address of the company's official LinkedIn page. Linked in the footer component.

### 1.2 Integration Webhooks (n8n workflows)
*   **`NEXT_PUBLIC_N8N_WEBHOOK_URL`**
    *   *Type:* URL string
    *   *Default:* `""` (Empty string)
    *   *Description:* Base endpoint for client-side API requests. Used if there is no server routing.
*   **`NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL`**
    *   *Type:* URL string
    *   *Default:* `""` (Empty string)
    *   *Description:* Fallback endpoint for demo requests if server proxy is disabled.
*   **`N8N_DEMO_WEBHOOK_URL`**
    *   *Type:* URL string
    *   *Default:* `""` (Empty string)
    *   *Description:* **[CRITICAL SECRET]** Server-side webhook endpoint. This variable is only read on the server side in the Next.js API Route Handler (`/api/demo`). Keeping this private resolves CORS issues and prevents malicious actors from finding and flooding your backend n8n workflow.

---

## 2. Setting Up Variables

### 2.1 Local Environment
Copy the example environment template into `.env.local` to override defaults locally:
```bash
cp .env.example .env.local
```
Edit `.env.local` and substitute values representing your local n8n tunnel or target CRM API keys.

### 2.2 Vercel (Production)
1. Go to the project dashboard on Vercel.
2. Select **Settings** > **Environment Variables**.
3. Create each variable with the target key and appropriate environment value.
4. Redefining variables triggers automatic production redeployments with updated configurations.
