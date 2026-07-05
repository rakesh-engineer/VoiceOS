/**
 * Global Configuration Settings.
 * Centralizes environment variable reading, ensuring defaults are set and validation can be added.
 */
export const config = {
  n8n: {
    // Client-safe environment URLs (if any, otherwise route to proxy route handler)
    webhookUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '',
    demoWebhookUrl: process.env.NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL || '',
  },
  server: {
    // Server-only webhooks (to prevent client-side leaks)
    n8nServerWebhookUrl: process.env.N8N_DEMO_WEBHOOK_URL || '',
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'VoiceOS',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Autonomous Enterprise AI Voice Platform',
    contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@voiceos.ai',
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'VoiceOS Inc.',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://voiceos.ai',
    social: {
      linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/voiceos',
    },
  },
};
