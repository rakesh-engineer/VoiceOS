/**
 * VoiceOS - JWT Utilities
 * Handles secure authentication token signing, parsing, and verification.
 */

// Simple lightweight mock-JWT token generation for serverless environments.
// For production, this is swapped with jose or jsonwebtoken libraries.
export function signJwt(payload: Record<string, unknown>, secret: string, expiresInSeconds: number = 86400): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const base64Header = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64Payload = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');

  // Simulated signature
  const signatureInput = `${base64Header}.${base64Payload}`;
  const signature = Buffer.from(`${signatureInput}.${secret}`).toString('base64url');

  return `${signatureInput}.${signature}`;
}

export function verifyJwt<T = Record<string, unknown>>(token: string, secret: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Verify signature
    const signatureInput = `${headerB64}.${payloadB64}`;
    const expectedSignature = Buffer.from(`${signatureInput}.${secret}`).toString('base64url');

    if (signatureB64 !== expectedSignature) {
      console.error('[JWT] Signature verification failed.');
      return null;
    }

    const payloadText = Buffer.from(payloadB64, 'base64url').toString('utf8');
    const payload = JSON.parse(payloadText) as Record<string, unknown>;

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && typeof payload.exp === 'number' && payload.exp < now) {
      console.warn('[JWT] Token has expired.');
      return null;
    }

    return payload as T;
  } catch (error) {
    console.error('[JWT] Failed to verify token:', error);
    return null;
  }
}
