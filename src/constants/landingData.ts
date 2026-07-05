import { TranscriptLine } from '@/types';

export const mockTranscript: TranscriptLine[] = [
  { sender: 'customer', text: "Hi, I'd like to book a property viewing for 104 Ocean Drive tomorrow afternoon.", time: '0:02' },
  { sender: 'ai', text: 'Hello! I can definitely help with that. Let me check availability for 104 Ocean Drive tomorrow. We have 2:00 PM and 4:30 PM open. Which works better for you?', time: '0:07' },
  { sender: 'customer', text: '4:30 PM works perfectly. My name is Alex Carter and my phone number is this one.', time: '0:14' },
  {
    sender: 'ai',
    text: "Excellent, Alex. I've booked you for tomorrow at 4:30 PM. I'm also sending a WhatsApp confirmation with the property details right now. Will you need assistance with pre-qualification financing?",
    time: '0:22',
    action: { type: 'calendar', label: 'Calendar Scheduled: Alex Carter - Viewing at 4:30 PM' }
  },
  { sender: 'customer', text: "Yes, actually. That would be very helpful. Can you send details on that?", time: '0:28' },
  {
    sender: 'ai',
    text: "Done! I've updated your record in our CRM, marked your financing interest, and triggered our WhatsApp follow-up sequence with our lending partners.",
    time: '0:34',
    action: { type: 'crm', label: 'HubSpot CRM Updated: Lead Score 95/100 (Hot)' }
  },
  {
    sender: 'customer',
    text: 'Wow, that was fast. Thank you so much!',
    time: '0:39',
    action: { type: 'whatsapp', label: 'WhatsApp Sent: Confirmation & Lending Info' }
  },
  {
    sender: 'ai',
    text: "You're very welcome, Alex! We look forward to seeing you tomorrow. Have a great day!",
    time: '0:43',
    action: { type: 'n8n', label: 'n8n Workflow Run: Triggered follow-ups' }
  }
];

export const problems = [
  {
    iconId: 'phone-off',
    title: 'Missed Inbound Traffic',
    description: 'When operations sleep, enterprise pipelines drain. Standard work hours miss 62% of incoming consumer signals, redirecting high-intent buyers straight to competitors.',
    metric: '62% Inbound Leakage',
    impact: 'Direct pipeline attrition'
  },
  {
    iconId: 'file-input',
    title: 'Manual Operational Drag',
    description: 'Account executives and support staff lose up to 30% of their operational day updating pipelines, log entries, and synchronization systems manually.',
    metric: '30% Output Deficit',
    impact: 'Systemic team fatigue and poor data logging'
  },
  {
    iconId: 'clock',
    title: 'Warm Lead Decay',
    description: 'Lead conversion ratios decay by 21x if the response latency exceeds 5 minutes. Traditional outbound teams take hours to follow up with new enquiries.',
    metric: '21x Conversion Spread',
    impact: 'Marketing budget inefficiency'
  },
  {
    iconId: 'users',
    title: 'Rigid Scaling Constraints',
    description: 'Hiring, training, and scaling manual call representatives is slow, fragile, and capital-intensive. Seasonal spike surges cause high abandon rates.',
    metric: 'Capital-Intensive Growth',
    impact: 'Brittle customer experiences'
  }
];

export const solutions = [
  {
    step: '01',
    iconId: 'phone',
    title: 'Instant Telephony Interception',
    description: 'VoiceOS answers incoming voice calls under 1 second. No IVR menus, holds, or artificial delays. Real-time synthesized speech with low-latency responsiveness.',
    badge: 'Real-time Gateway'
  },
  {
    step: '02',
    iconId: 'brain-circuit',
    title: 'Enterprise Context Engines',
    description: 'Integrates secure vector-space databases (RAG) and internal knowledge stores to reply to complex business parameters without data hallucinations.',
    badge: 'Context-Aware'
  },
  {
    step: '03',
    iconId: 'zap',
    title: 'Asynchronous Workflow Execution',
    description: 'Auto-updates HubSpot pipelines, formats structured notes, sends WhatsApp alerts, and fires n8n sequences concurrently during active speech.',
    badge: 'Zero Latency Sync'
  },
  {
    step: '04',
    iconId: 'users',
    title: 'Deterministic Escalate Hand-off',
    description: 'Detects compound requests or sentiment spikes to trigger a live call redirect to human experts, routing the full conversation transcript synchronously.',
    badge: 'Warm Escalations'
  }
];

export const features = [
  {
    iconId: 'phone-call',
    title: 'Inbound Voice Gateways',
    description: 'Sub-second audio synthesis pipelines that listen, analyze intent, and response with human-like conversation speeds.',
    benefit: 'Sub-1.2s conversation loop',
    colorClass: 'text-violet-400 border-zinc-900 bg-zinc-900/10',
    glowClass: 'group-hover:border-violet-500/20'
  },
  {
    iconId: 'message-circle',
    title: 'Outbound Campaigns',
    description: 'Automate scalable outreach campaigns, event notifications, check-ins, and survey cycles with natural dialogue capabilities.',
    benefit: 'Scale to 10k concurrent calls',
    colorClass: 'text-indigo-400 border-zinc-900 bg-zinc-900/10',
    glowClass: 'group-hover:border-indigo-500/20'
  },
  {
    iconId: 'database',
    title: 'Knowledge Engine (RAG)',
    description: 'Dynamically references document databases, internal files, policies, and systems to deliver validated answers mid-call.',
    benefit: 'Zero hallucination constraints',
    colorClass: 'text-cyan-400 border-zinc-900 bg-zinc-900/10',
    glowClass: 'group-hover:border-cyan-500/20'
  },
  {
    iconId: 'trending-up',
    title: 'Workflow Automation',
    description: 'Execute nested trigger loops during active voice sessions. Sync platforms, resolve tickets, and trigger API webhooks.',
    benefit: 'Integrate with any REST system',
    colorClass: 'text-emerald-400 border-zinc-900 bg-zinc-900/10',
    glowClass: 'group-hover:border-emerald-500/20'
  },
  {
    iconId: 'refresh-cw',
    title: 'Analytics Cockpit',
    description: 'Full oversight on call volumes, sentiment models, operational bottlenecks, latency metrics, and conversion funnels.',
    benefit: 'Structured JSON event logs',
    colorClass: 'text-purple-400 border-zinc-900 bg-zinc-900/10',
    glowClass: 'group-hover:border-purple-500/20'
  },
  {
    iconId: 'send',
    title: 'Integrations & Administration',
    description: 'Control access levels, secure API tunnels, audit system histories, and manage live credentials from a centralized portal.',
    benefit: 'SAML SSO & OAuth compliance',
    colorClass: 'text-teal-400 border-zinc-900 bg-zinc-900/10',
    glowClass: 'group-hover:border-teal-500/20'
  }
];

export const aiEmployees = [
  {
    role: 'AI Receptionist',
    availability: '24/7/365 • Instant Response',
    capabilities: 'Multi-lingual routing, scheduling, general business FAQs, warm transfers to department extensions.',
    integrations: 'Google Calendar, Outlook, Dialpad, Twilio, Slack',
    metric: 'Handles 1,000+ concurrent calls'
  },
  {
    role: 'AI Sales Executive',
    availability: 'Immediate Outbound Trigger',
    capabilities: 'Inbound lead qualification, demo scheduling, deal scoring, outbound cold-lead activation sequences.',
    integrations: 'HubSpot, Salesforce, Outreach, Calendly, Stripe',
    metric: 'Boosts booking rates by 34%'
  },
  {
    role: 'AI Customer Support',
    availability: '24/7/365 • Zero Queue Hold',
    capabilities: 'Shopify order tracking, return processing, credentials resets, dynamic shipping status lookups.',
    integrations: 'Shopify, Zendesk, Gorgias, Stripe, FedEx API',
    metric: '78% First Call Resolution (FCR)'
  },
  {
    role: 'AI Travel Consultant',
    availability: 'High-Concurrency Support',
    capabilities: 'Flight reservation updates, hotel check-ins, mileage adjustments, booking confirmation delivery.',
    integrations: 'Sabre GDS, Amadeus API, Stripe, WhatsApp Business',
    metric: 'Reduces peak hold times to 0s'
  },
  {
    role: 'AI Healthcare Assistant',
    availability: 'HIPAA Compliant Gateway',
    capabilities: 'Appointment coordination, insurance verification checks, patient triage classification, reminder delivery.',
    integrations: 'Epic EHR, Cerner, Twilio HIPAA Trunking, SMS',
    metric: '94% Schedule Adherence'
  },
  {
    role: 'AI Collections Agent',
    availability: 'Automated Account Routing',
    capabilities: 'Payment reminder broadcasts, payment portal generation, billing dispute recording, settlement negotiations.',
    integrations: 'Stripe, PayPal, HubSpot, Twilio, n8n webhook',
    metric: 'Recovers 18% idle account assets'
  },
  {
    role: 'AI HR Assistant',
    availability: 'Internal Gateway Routing',
    capabilities: 'Initial candidate pre-screening, interview coordination, policy FAQ lookup, benefits details delivery.',
    integrations: 'Workday, Greenhouse, Ashby, Slack, Google Meet',
    metric: 'Speeds hiring screening by 4x'
  }
];

export const integrations = [
  { name: 'Salesforce', category: 'CRM' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Zoho', category: 'CRM' },
  { name: 'WhatsApp', category: 'Messaging' },
  { name: 'Google Calendar', category: 'Calendar' },
  { name: 'Microsoft Teams', category: 'Communication' },
  { name: 'Slack', category: 'Communication' },
  { name: 'Twilio', category: 'Telephony' },
  { name: 'REST APIs', category: 'Core' },
  { name: 'Webhooks', category: 'Core' },
  { name: 'n8n', category: 'Automation' },
  { name: 'OpenAI', category: 'AI Models' },
  { name: 'Google AI', category: 'AI Models' }
];

export const securityFeatures = [
  {
    title: 'Role-Based Access (RBAC)',
    description: 'Enforce granular permission layers for dashboards, log sheets, API keys, and voice templates. Supports SAML SSO and OAuth verification.'
  },
  {
    title: 'Comprehensive Audit Logs',
    description: 'Trace system changes, administrative actions, API queries, and credential adjustments in a tamper-resistant enterprise log repository.'
  },
  {
    title: 'End-to-End Encryption',
    description: 'Encrypt voice audio packets, transcription payloads, and static user data in transit (TLS 1.3) and at rest (AES-256).'
  },
  {
    title: 'Secure API Gateway',
    description: 'All customer database queries and n8n webhook calls route through our proxy handler, hiding proprietary backend URLs.'
  },
  {
    title: 'Webhook Signature Validation',
    description: 'Secure payload deliveries. Incoming webhooks are validated using cryptographic SHA-256 HMAC headers.'
  },
  {
    title: 'Deterministic Escalation Protocol',
    description: 'Guaranteed fallback routing. Intelligently routes call control back to human trunks if AI confidence metrics decline.'
  },
  {
    title: 'Strict PII Data Privacy',
    description: 'Supports HIPAA-compliant networks. Auto-redacts credit card numbers, social identifiers, and sensitive healthcare data from transcripts.'
  }
];

export const journeySteps = [
  { title: 'Inbound Telephony Intercept', desc: 'Call connects via Twilio, Vonage, or direct SIP Trunk.' },
  { title: 'VoiceOS Answering', desc: 'Synthesizes context-aware audio answers under 1.2 seconds.' },
  { title: 'Intent Identification', desc: 'Determines customer objectives and categorizes queries.' },
  { title: 'Semantic Knowledge Query', desc: 'Executes RAG semantic searches over vector databases.' },
  { title: 'Workflow Dispatch', desc: 'Runs background scripts, API calls, and n8n triggers.' },
  { title: 'CRM Synchronization', desc: 'Logs transcripts and updates lead statuses in Salesforce.' },
  { title: 'WhatsApp Dispatch', desc: 'Sends confirmations, receipts, and support tickets.' },
  { title: 'Calendar Coordination', desc: 'Validates available times and schedules meetings.' },
  { title: 'Operational Analytics', desc: 'Pushes execution logs, latencies, and metrics to dashboard.' }
];

export const faqs = [
  {
    question: 'How does VoiceOS achieve sub-second response latency?',
    answer: 'VoiceOS utilizes custom stream orchestration pipelines. By streaming audio directly through WebSockets and optimizing Voice Activity Detection (VAD) alongside high-speed Text-to-Speech (TTS) caches, we maintain a conversational latency loop under 1.2 seconds, matching human conversation rhythm.'
  },
  {
    question: 'How do you prevent AI hallunications during customer calls?',
    answer: 'Our context architecture utilizes a deterministic Retrieval-Augmented Generation (RAG) structure. The LLM is restricted to search only within validated tenant-specific databases and wiki indexes. If a query falls outside this context boundary, the agent executes a structured hand-off to human support rather than fabricating answers.'
  },
  {
    question: 'Can VoiceOS connect with custom built internal APIs?',
    answer: 'Yes. VoiceOS features native webhook nodes and a secure API proxy layer, allowing the agent to perform secure REST queries, invoke webhooks, and trigger custom n8n workflows that query or update your private databases during a call.'
  },
  {
    question: 'Is VoiceOS compliant with industry security standards?',
    answer: 'Absolutely. VoiceOS is built for enterprise scale, featuring TLS 1.3 and AES-256 encryption, SAML SSO authentication, SHA-256 webhook validations, full system audit logging, and PII auto-redaction rules supporting HIPAA and SOC2 compliance paths.'
  },
  {
    question: 'What happens if a call needs human intervention?',
    answer: 'VoiceOS implements a seamless escalation bridge. When the agent detects confusion, billing issues, or direct requests for human support, it initiates a SIP transfer. The recipient agent receives the call along with a real-time transcript of the conversation to ensure a warm hand-off.'
  }
];

export const nodes = [
  {
    id: 'customer',
    iconId: 'phone-call',
    label: 'Customer Call',
    subtitle: 'Inbound VoIP / SIP Trunk',
    description: 'Real-time audio stream connected via Twilio, Vonage, or direct SIP trunk. Audio is captured and processed instantaneously.',
    colorClass: 'text-zinc-200 bg-zinc-900/40 border-zinc-800/80'
  },
  {
    id: 'voiceos',
    iconId: 'settings',
    label: 'VoiceOS Gateway',
    subtitle: 'VAD / ASR / TTS Orchestrator',
    description: 'Handles Voice Activity Detection, Automatic Speech Recognition, and Text-to-Speech orchestration with sub-100ms processing.',
    colorClass: 'text-zinc-200 bg-zinc-900/40 border-zinc-800/80'
  },
  {
    id: 'ai-engine',
    iconId: 'cpu',
    label: 'AI Intent Engine',
    subtitle: 'RAG & Context Manager',
    description: 'LLM-driven orchestrator determines user intent, retrieves documents via semantic search (RAG), and structures output data.',
    colorClass: 'text-zinc-200 bg-zinc-900/40 border-zinc-800/80'
  },
  {
    id: 'n8n',
    iconId: 'workflow',
    label: 'n8n Workflow Hub',
    subtitle: 'Automation & Routing',
    description: 'Executes preconfigured webhooks, parses lead scores, coordinates external API calls, and handles conditional branch logic.',
    colorClass: 'text-zinc-200 bg-zinc-900/40 border-zinc-800/80'
  }
];

export const outputs = [
  { iconId: 'database', label: 'CRM Systems', desc: 'HubSpot, Salesforce, PostgreSQL' },
  { iconId: 'message-square', label: 'WhatsApp API', desc: 'Instant follow-up messaging' },
  { iconId: 'calendar-days', label: 'Calendars', desc: 'Google Calendar, Outlook' }
];

export const industries = [
  {
    id: 'travel',
    iconId: 'plane',
    name: 'Travel & Hospitality',
    useCase: 'Rebooking & Inquiries',
    description: 'Automate flight changes, hotel bookings, baggage queries, and upgrade requests during peak travel seasons.',
    dialogCustomer: "My flight to Paris tomorrow was canceled. Can you put me on the next available one?",
    dialogVoiceOS: "Searching... I found a flight leaving at 8:00 AM tomorrow. I have confirmed your seat and updated your digital ticket.",
    outcome: 'Ticket updated in Amadeus, boarding pass sent via WhatsApp'
  },
  {
    id: 'healthcare',
    iconId: 'heart-pulse',
    name: 'Healthcare & Clinics',
    useCase: 'Triage & Appointments',
    description: 'Manage patient scheduling, pre-visit insurance validation, prescription status lookups, and routing.',
    dialogCustomer: "I need to reschedule my consultation with Dr. Vance tomorrow to sometime on Thursday.",
    dialogVoiceOS: "Certainly. Dr. Vance has a opening at 10:30 AM on Thursday. Shall I book that for you?",
    outcome: 'Appt moved in Epic EHR, SMS reminder scheduled, calendar updated'
  },
  {
    id: 'realestate',
    iconId: 'building-2',
    name: 'Real Estate',
    useCase: 'Lead Capture & Showings',
    description: 'Answer listings queries 24/7, qualify buyer intent, send property flyers instantly, and book physical tours.',
    dialogCustomer: "Is the Ocean Drive property still available? I want to see it tomorrow afternoon.",
    dialogVoiceOS: "Yes, it is! I have booked a showing for you at 3:00 PM tomorrow. Listing agent Sarah has been notified.",
    outcome: 'Lead rated Hot in HubSpot, tour booked in Google Calendar'
  },
  {
    id: 'education',
    iconId: 'graduation-cap',
    name: 'Education',
    useCase: 'Enrollment & Admission FAQs',
    description: 'Assist prospective students with application deadlines, program details, fee schedules, and registration.',
    dialogCustomer: "What is the deadline for the Fall MBA program, and how do I apply?",
    dialogVoiceOS: "The deadline is August 15th. I am sending the enrollment portal link and fee structure to your email right now.",
    outcome: 'Prospect logged in Salesforce Education Cloud, guide emailed'
  },
  {
    id: 'support',
    iconId: 'headphones',
    name: 'Customer Support',
    useCase: 'Triage & Resolution',
    description: 'Resolve order status, return processing, billing discrepancies, and password resets without human intervention.',
    dialogCustomer: "My order says it was delivered, but I don't see it anywhere.",
    dialogVoiceOS: "Let me check. According to FedEx, it was left at the side gate. If it's still missing, I can open a support ticket.",
    outcome: 'Checked Shopify API, delivery photo link sent via WhatsApp'
  }
];

export const comparisonData = [
  {
    feature: '24/7 Coverage',
    traditional: {
      text: 'Requires graveyard shifts, complex rota planning, and 2.5x holiday pay premiums.',
      isGood: false
    },
    voiceos: {
      text: 'Instant, native 24/7/365 coverage with zero marginal cost and no downtime.',
      isGood: true
    }
  },
  {
    feature: 'Response Time',
    traditional: {
      text: 'Long queue holds, boring hold music, and robotic IVR press-button menus.',
      isGood: false
    },
    voiceos: {
      text: 'Sub-second conversation latency. Instantly picks up on the first ring.',
      isGood: true
    }
  },
  {
    feature: 'Data & Workflows',
    traditional: {
      text: 'Manual data entry, skipped CRM logging, and slow email-based handovers.',
      isGood: false
    },
    voiceos: {
      text: 'Synchronous HubSpot updates, instant WhatsApp follows, and n8n scripts.',
      isGood: true
    }
  },
  {
    feature: 'Scalability',
    traditional: {
      text: 'Strictly limited by headcount. Spikes in calls force long hold times or busy signals.',
      isGood: false
    },
    voiceos: {
      text: 'Infinite concurrent processing capacity. Handles 10,000 calls simultaneously.',
      isGood: true
    }
  },
  {
    feature: 'Setup & Deployment',
    traditional: {
      text: 'Hiring cycles take 4-8 weeks. Training, churn, and quality assurance are continuous overheads.',
      isGood: false
    },
    voiceos: {
      text: 'Deploys in days. Integrated RAG knowledge base updates dynamically in real-time.',
      isGood: true
    }
  }
];
