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
}
