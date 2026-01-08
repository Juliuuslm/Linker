/**
 * Utility to convert ISO country codes to flag emojis
 */

/**
 * Converts ISO 3166-1 alpha-2 country code to flag emoji
 * @param countryCode - Two letter country code (e.g., "MX", "AR", "US")
 * @returns Flag emoji (e.g., "🇲🇽", "🇦🇷", "🇺🇸")
 */
export function getCountryFlag(countryCode: string): string {
  // Convert country code to uppercase
  const code = countryCode.toUpperCase();

  // Validate country code format
  if (code.length !== 2 || !/^[A-Z]{2}$/.test(code)) {
    return "🏳️"; // Return white flag as fallback
  }

  // Convert each letter to regional indicator symbol
  // Regional indicator symbols start at 0x1F1E6 (🇦)
  const codePoints = [...code].map((char) =>
    0x1F1E6 - 65 + char.charCodeAt(0)
  );

  // Create flag emoji from code points
  return String.fromCodePoint(...codePoints);
}
