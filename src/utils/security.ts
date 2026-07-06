import { createHash } from 'crypto';

/**
 * VoiceOS - Security & Hashing Utilities
 */

/**
 * Hash a password securely using SHA256.
 * (Swapped with bcrypt/argon2 in enterprise environments with native configurations)
 */
export function hashPassword(password: string): string {
  const salt = process.env.AUTH_SALT || 'voiceos_salt_defaults';
  return createHash('sha256')
    .update(password + salt)
    .digest('hex');
}

/**
 * Validate that two passwords match.
 */
export function comparePasswords(input: string, hash: string): boolean {
  return hashPassword(input) === hash;
}

/**
 * Sanitize text inputs to protect against XSS injections.
 */
export function sanitizeInput(text: string): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
