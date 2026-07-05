import { ApiResponse } from '@/types';
import { config as appConfig } from '@/config';

/**
 * API service helper for connecting to external services (e.g., n8n webhooks).
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = new Headers(options.headers || {});
    if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const requestConfig: RequestInit = {
      ...options,
      headers,
    };

    // Determine the base URL (uses config helper)
    const baseUrl = appConfig.n8n.webhookUrl;
    const fullUrl = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

    const response = await fetch(fullUrl, requestConfig);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! Status: ${response.status}`);
    }

    // Try to parse as JSON, fallback to text or empty object
    const contentType = response.headers.get('content-type');
    let data: T;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text } as T;
    }

    return {
      success: true,
      data,
    };
  } catch (error: unknown) {
    console.error('API request failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
