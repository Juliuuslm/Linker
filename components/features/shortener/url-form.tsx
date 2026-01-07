"use client";

import * as React from "react";
import { Loader2, Link as LinkIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/cn";
import type { ShortenUrlResponse } from "@/types/shortener.types";

interface UrlFormProps {
  onSuccess?: (data: ShortenUrlResponse["data"]) => void;
}

export function UrlForm({ onSuccess }: UrlFormProps) {
  const { t } = useLocale();
  const [url, setUrl] = React.useState("");
  const [customAlias, setCustomAlias] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url.trim(),
          customAlias: customAlias.trim() || undefined,
        }),
      });

      const data: ShortenUrlResponse = await response.json();

      if (!data.success) {
        setError(data.error?.message || "Error al acortar la URL");
        return;
      }

      // Success
      if (data.data) {
        onSuccess?.(data.data);
        // Clear form
        setUrl("");
        setCustomAlias("");
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = url.trim().length > 0 && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* URL Input */}
      <div>
        <label
          htmlFor="original-url"
          className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
        >
          URL Original
        </label>
        <div className="relative">
          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
          <Input
            id="original-url"
            type="url"
            placeholder={t.shortener.urlPlaceholder}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-12 text-base"
            disabled={isLoading}
            error={!!error}
          />
        </div>
        <p className="mt-1.5 text-xs text-light-muted dark:text-dark-muted">
          Introduce la URL completa que deseas acortar (incluye http:// o
          https://)
        </p>
      </div>

      {/* Custom Alias Input */}
      <div>
        <label
          htmlFor="custom-alias"
          className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
        >
          {t.shortener.aliasLabel}{" "}
          <span className="text-light-muted dark:text-dark-muted font-normal">
            ({t.common.optional})
          </span>
        </label>
        <div className="relative">
          <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
          <Input
            id="custom-alias"
            type="text"
            placeholder={t.shortener.aliasPlaceholder}
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            className="pl-12"
            disabled={isLoading}
            maxLength={50}
          />
        </div>
        <p className="mt-1.5 text-xs text-light-muted dark:text-dark-muted">
          Personaliza tu enlace corto (solo letras, números, guiones y guiones
          bajos)
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div
          className={cn(
            "p-4 rounded-xl animate-fadeIn",
            "bg-red-500/10 border-2 border-red-500/20",
            "text-red-600 dark:text-red-400 text-sm font-medium"
          )}
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        className="w-full"
        disabled={!isFormValid}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {t.shortener.generating}
          </>
        ) : (
          <>
            <LinkIcon className="w-5 h-5 mr-2" />
            {t.shortener.generate}
          </>
        )}
      </Button>
    </form>
  );
}
