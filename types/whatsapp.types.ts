/**
 * Types for WhatsApp Link Generator Feature
 */

import type { Country } from "@/lib/constants/countries";

export interface WhatsAppFormData {
  country: Country;
  phone: string;
  message: string;
}

export interface WhatsAppLinkResult {
  url: string;
  displayPhone: string;
}

export type TextFormatAction = "bold" | "italic" | "strikethrough" | "monospace";

export interface TextFormatButton {
  action: TextFormatAction;
  label: string;
  symbol: string;
  description: string;
}
