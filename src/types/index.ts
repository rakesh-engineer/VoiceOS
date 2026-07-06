export interface TranscriptLine {
  sender: 'customer' | 'ai';
  text: string;
  time: string;
  action?: {
    type: 'crm' | 'whatsapp' | 'calendar' | 'n8n';
    label: string;
  };
}

export interface ProblemItem {
  icon: string; // Represent icon as string identifier for lookup mapping
  title: string;
  description: string;
  metric: string;
  impact: string;
}

export interface SolutionStep {
  step: string;
  icon: string;
  title: string;
  description: string;
  badge: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  benefit: string;
  colorClass: string;
  glowClass: string;
}

export interface NodeItem {
  id: string;
  icon: string;
  label: string;
  subtitle: string;
  description: string;
  colorClass: string;
}

export interface OutputItem {
  icon: string;
  label: string;
  desc: string;
}

export interface IndustryItem {
  id: string;
  icon: string;
  name: string;
  useCase: string;
  description: string;
  dialogCustomer: string;
  dialogVoiceOS: string;
  outcome: string;
}

export interface ComparisonRow {
  feature: string;
  traditional: {
    text: string;
    isGood: boolean;
  };
  voiceos: {
    text: string;
    isGood: boolean;
  };
}

export interface DemoRequestData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp?: string;
}

// =========================================================================
// SaaS Foundation Domain Models
// =========================================================================

export type UserRole = 'Owner' | 'Admin' | 'Developer' | 'Operator' | 'Viewer';

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Invitation {
  id: string;
  organizationId: string;
  email: string;
  role: UserRole;
  token: string;
  expiresAt: string;
  acceptedAt?: string;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: string;
  createdAt: string;
}

// =========================================================================
// AI Employee & Core Infrastructure Types
// =========================================================================

export type EmployeeStatus = 'Active' | 'Draft' | 'Paused';

export interface AIEmployee {
  id: string;
  organizationId: string;
  workspaceId: string;
  name: string;
  roleTitle: string;
  avatarUrl?: string;
  status: EmployeeStatus;
  llmModel: string;
  systemPrompt: string;
  temperature: number;
  createdAt: string;
  updatedAt: string;
}

export type ChannelType = 'Voice' | 'WhatsApp' | 'Chat' | 'Email';

export interface Channel {
  id: string;
  organizationId: string;
  workspaceId: string;
  name: string;
  type: ChannelType;
  isActive: boolean;
  config: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ChannelAssignment {
  id: string;
  aiEmployeeId: string;
  channelId: string;
  createdAt: string;
}

export interface KnowledgeSource {
  id: string;
  organizationId: string;
  workspaceId: string;
  name: string;
  type: string; // 'PDF' | 'Website' | 'Database' etc.
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  knowledgeSourceId: string;
  title: string;
  content: string;
  vectorId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// =========================================================================
// Logging, Analytics, and Auditing
// =========================================================================

export interface ConversationLog {
  id: string;
  organizationId: string;
  aiEmployeeId?: string;
  channelType: ChannelType;
  sessionIdentifier: string;
  startedAt: string;
  endedAt?: string;
  summary?: string;
  sentimentScore?: number;
  metadata: Record<string, unknown>;
}

export interface MessageExchange {
  id: string;
  conversationId: string;
  sender: 'Customer' | 'AI';
  content: string;
  latencyMs?: number;
  createdAt: string;
}

export interface Call {
  id: string;
  conversationId: string;
  telephonyProvider: string; // 'Twilio' | 'Vonage'
  providerCallSid: string;
  fromNumber: string;
  toNumber: string;
  durationSeconds?: number;
  recordingUrl?: string;
  status: string;
}

export interface AuditLog {
  id: string;
  organizationId: string;
  userId?: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, unknown>;
  createdAt: string;
}

// =========================================================================
// Automations & Core Integrations
// =========================================================================

export interface AutomationWorkflow {
  id: string;
  organizationId: string;
  name: string;
  engine: string; // 'n8n' | 'Temporal' | 'LangGraph'
  externalWorkflowId: string;
  triggerConditions: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  conversationId?: string;
  status: 'Success' | 'Running' | 'Failed';
  payloadSent: Record<string, unknown>;
  responseReceived?: Record<string, unknown>;
  errorMessage?: string;
  executionTimeMs?: number;
  createdAt: string;
}

// =========================================================================
// Platform Operations & Billing
// =========================================================================

export interface ApiKey {
  id: string;
  organizationId: string;
  name: string;
  keyPrefix: string;
  keyHash: string;
  expiresAt?: string;
  createdAt: string;
  lastUsedAt?: string;
}

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message?: string;
  status: string; // 'Pending' | 'Processed' | 'Failed'
  dbCreatedAt: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  planTier: 'Free' | 'Pro' | 'Enterprise';
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingRecord {
  id: string;
  organizationId: string;
  invoiceId?: string;
  amountCents: number;
  currency: string;
  status: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  createdAt: string;
}

