/**
 * Hash utilities for document verification
 */

/**
 * Compute SHA-256 hash of a file
 * @param file - The file to hash
 * @returns Promise<string> - The hex-encoded SHA-256 hash
 */
export async function computeFileHash(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Compare two hashes (case-insensitive)
 * @param hash1 - First hash
 * @param hash2 - Second hash
 * @returns boolean - True if hashes match
 */
export function compareHashes(hash1: string, hash2: string): boolean {
  return hash1.toLowerCase() === hash2.toLowerCase();
}

/**
 * Shorten a hash for display (first 8 chars + last 4 chars)
 * @param hash - The full hash
 * @returns string - Shortened hash
 */
export function shortenHash(hash: string): string {
  if (!hash || hash.length < 12) return hash;
  return `${hash.substring(0, 8)}...${hash.substring(hash.length - 4)}`;
}

/**
 * Format hash for display with proper casing
 * @param hash - The hash to format
 * @returns string - Formatted hash
 */
export function formatHash(hash: string): string {
  if (!hash) return '';
  return hash.toLowerCase();
}
