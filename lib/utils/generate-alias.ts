import { nanoid, customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";

/**
 * Generate a unique alias for shortened URLs
 */

// Custom alphabet: alphanumeric only (no special chars for clean URLs)
const generateId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6
);

/**
 * Generate a unique 6-character alias
 * Retries if alias already exists in database
 */
export async function generateUniqueAlias(
  maxRetries = 10
): Promise<string | null> {
  for (let i = 0; i < maxRetries; i++) {
    const alias = generateId();

    // Check if alias already exists
    const existing = await prisma.shortenedUrl.findUnique({
      where: { alias },
    });

    if (!existing) {
      return alias;
    }
  }

  // Failed to generate unique alias after max retries
  return null;
}

/**
 * Check if a custom alias is available
 */
export async function isAliasAvailable(alias: string): Promise<boolean> {
  const existing = await prisma.shortenedUrl.findUnique({
    where: { alias: alias.toLowerCase() },
  });

  return !existing;
}
