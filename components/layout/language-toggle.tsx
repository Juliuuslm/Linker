"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/cn";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full border-2 transition-all duration-200 hover:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "border-light-muted dark:border-dark-muted text-light-text dark:text-dark-text"
      )}
      aria-label={
        locale === "es" ? "Cambiar a inglés" : "Switch to Spanish"
      }
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-bold font-syne uppercase">{locale}</span>
    </button>
  );
}
