import { z } from "zod";

/**
 * URL Shortener Validation Schemas
 */

// Validate URL format
export const urlSchema = z
  .string()
  .min(1, "La URL es requerida")
  .max(2048, "La URL es demasiado larga (máximo 2048 caracteres)")
  .url("La URL debe ser válida (incluir http:// o https://)")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        // Solo permitir http y https
        return parsed.protocol === "http:" || parsed.protocol === "https:";
      } catch {
        return false;
      }
    },
    "Solo se permiten URLs con protocolo http o https"
  )
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        // Disallow localhost and private IPs in production
        if (process.env.NODE_ENV === "production") {
          const hostname = parsed.hostname.toLowerCase();
          return (
            !hostname.includes("localhost") &&
            !hostname.includes("127.0.0.1") &&
            !hostname.includes("0.0.0.0") &&
            !hostname.match(/^10\./) &&
            !hostname.match(/^192\.168\./) &&
            !hostname.match(/^172\.(1[6-9]|2[0-9]|3[0-1])\./)
          );
        }
        return true;
      } catch {
        return false;
      }
    },
    { message: "La URL no puede ser localhost o IP privada en producción" }
  );

// Validate custom alias (alphanumeric, hyphens, underscores only)
export const aliasSchema = z
  .string()
  .min(3, "El alias debe tener al menos 3 caracteres")
  .max(50, "El alias no puede tener más de 50 caracteres")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "El alias solo puede contener letras, números, guiones y guiones bajos"
  )
  .refine(
    (alias) => {
      // Reserved aliases that cannot be used
      const reserved = [
        "api",
        "admin",
        "login",
        "signup",
        "register",
        "app",
        "dashboard",
        "settings",
        "help",
        "about",
        "contact",
        "terms",
        "privacy",
        "qr",
        "whatsapp",
        "shortener",
      ];
      return !reserved.includes(alias.toLowerCase());
    },
    { message: "Este alias está reservado y no puede ser usado" }
  );

// Combined schema for shorten request
export const shortenRequestSchema = z.object({
  originalUrl: urlSchema,
  customAlias: aliasSchema.optional(),
});

// Type inference
export type ShortenRequestInput = z.infer<typeof shortenRequestSchema>;
