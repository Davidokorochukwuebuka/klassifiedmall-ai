/**
 * Masking utilities for displaying partially hidden email and phone.
 * Used on the verification page to show the user where codes were sent.
 */

/**
 * Mask an email address.
 * Preserves first character of local part, masks rest, shows full domain.
 * Example: "john.doe@gmail.com" → "j***@gmail.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***@***.***';

  const [local, domain] = email.split('@');
  if (local.length <= 1) return `${local}***@${domain}`;

  return `${local[0]}***@${domain}`;
}

/**
 * Mask a phone number in E.164 format.
 * Preserves country code prefix and last 4 digits, masks middle.
 * Example: "+2348012345678" → "+234***5678"
 */
export function maskPhone(e164: string): string {
  if (!e164 || e164.length < 8) return '+***';

  // Find where the national number starts (after + and dial code)
  // Show first 4 chars (includes + and part of dial code) and last 4
  const prefix = e164.slice(0, 4);
  const suffix = e164.slice(-4);

  return `${prefix}***${suffix}`;
}
