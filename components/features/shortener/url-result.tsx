"use client";

import * as React from "react";
import {
  Copy,
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/cn";

interface UrlResultProps {
  shortUrl: string;
  originalUrl: string;
  alias: string;
  createdAt: Date;
}

export function UrlResult({
  shortUrl,
  originalUrl,
  alias,
  createdAt,
}: UrlResultProps) {
  const { t } = useLocale();
  const [copied, setCopied] = React.useState(false);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Open link in new tab
  const handleOpen = () => {
    window.open(shortUrl, "_blank", "noopener,noreferrer");
  };

  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "p-6 rounded-2xl space-y-6 animate-slideUp",
        "bg-gradient-to-br from-primary/5 to-primary/10",
        "border-2 border-primary/20"
      )}
    >
      {/* Success Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-syne font-bold text-light-text dark:text-dark-text">
            ¡Listo!
          </h4>
          <p className="text-sm text-light-muted dark:text-dark-muted">
            Tu enlace corto ha sido creado
          </p>
        </div>
      </div>

      {/* Short URL Display */}
      <div className="space-y-3">
        <label className="block text-xs font-syne font-semibold uppercase tracking-wide text-light-text dark:text-dark-text opacity-70">
          Tu Enlace Corto
        </label>
        <div
          className={cn(
            "flex items-center gap-2 p-4 rounded-xl",
            "bg-white dark:bg-dark-bg",
            "border-2 border-light-muted/20 dark:border-dark-muted/20"
          )}
        >
          <div className="flex-1 min-w-0">
            <p className="text-lg font-mono font-bold text-primary truncate">
              {shortUrl}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={handleCopy} variant="default" size="md">
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t.common.copied}
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              {t.common.copy}
            </>
          )}
        </Button>
        <Button onClick={handleOpen} variant="outline" size="md">
          <ExternalLink className="w-4 h-4 mr-2" />
          {t.common.open}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-light-muted/20 dark:border-dark-muted/20">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
            <TrendingUp className="w-4 h-4" />
            <span>Alias</span>
          </div>
          <p className="text-sm font-mono font-semibold text-light-text dark:text-dark-text">
            /{alias}
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
            <Calendar className="w-4 h-4" />
            <span>Creado</span>
          </div>
          <p className="text-xs font-medium text-light-text dark:text-dark-text">
            {formatDate(createdAt)}
          </p>
        </div>
      </div>

      {/* Original URL */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-syne font-semibold uppercase tracking-wide text-light-text dark:text-dark-text opacity-70">
          URL Original
        </label>
        <p className="text-sm text-light-muted dark:text-dark-muted break-all">
          {originalUrl}
        </p>
      </div>
    </div>
  );
}
