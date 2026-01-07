/**
 * Types for QR Code Generator Feature
 */

export type QRType = "url" | "text" | "email" | "vcard";

export interface QRUrlData {
  url: string;
}

export interface QRTextData {
  text: string;
}

export interface QREmailData {
  email: string;
  subject?: string;
  body?: string;
}

export interface QRVCardData {
  name: string;
  phone?: string;
  email?: string;
  organization?: string;
  title?: string;
}

export type QRData = QRUrlData | QRTextData | QREmailData | QRVCardData;

export interface QRConfig {
  type: QRType;
  data: QRData;
  color: string;
  size: number;
}

export type QRFormat = "png" | "svg";
