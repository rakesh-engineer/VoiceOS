/**
 * Combines multiple CSS class names together, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a phone number string to a standard readable format.
 * Example: +15550000000 -> +1 (555) 000-0000
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? '+1 ' : '';
    return `${intlCode}(${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phone;
}
