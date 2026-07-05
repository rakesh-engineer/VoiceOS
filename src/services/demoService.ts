import { DemoRequestData, ApiResponse } from '@/types';

/**
 * Service to handle business logic for the Demo request.
 * Routes requests through the secure local proxy endpoint (/api/demo)
 * instead of direct client-to-webhook calls, resolving CORS and security concerns.
 */
export async function submitDemoRequest(
  data: DemoRequestData
): Promise<ApiResponse<{ message: string; timestamp: string }>> {
  try {
    const response = await fetch('/api/demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<{ message: string; timestamp: string }> = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || `HTTP error! Status: ${response.status}`);
    }

    return {
      success: true,
      data: result.data || { message: 'Submission successful.', timestamp: new Date().toISOString() },
    };
  } catch (error: unknown) {
    console.error('demoService submit failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to submit request.';
    return {
      success: false,
      error: errorMessage,
    };
  }
}
