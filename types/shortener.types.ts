/**
 * Types for URL Shortener Feature
 */

export interface ShortenUrlRequest {
  originalUrl: string;
  customAlias?: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  data?: {
    id: string;
    alias: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: Date;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface ShortenedUrlData {
  id: string;
  alias: string;
  originalUrl: string;
  createdAt: Date;
  clickCount: number;
  isActive: boolean;
}
