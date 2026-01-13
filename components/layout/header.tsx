"use client";

import * as React from "react";
import Link from "next/link";
import { LinkIcon, Clock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LanguageToggle } from "./language-toggle";
import { cn } from "@/lib/utils/cn";

interface HeaderProps {
  onHistoryClick?: () => void;
  historyCount?: number;
}

export function Header({ onHistoryClick, historyCount = 0 }: HeaderProps) {
  return (
    <header className="w-full px-6 py-6 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md sticky top-0 z-50 border-b border-light-muted/10 dark:border-dark-muted/10">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform hover:scale-105"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transform rotate-3 bg-primary shadow-lg group-hover:rotate-6 transition-transform duration-300">
            <LinkIcon className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-kangge font-bold tracking-wider text-light-text dark:text-dark-text">
            LINKER
          </h1>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* History Button */}
          {onHistoryClick && (
            <button
              onClick={onHistoryClick}
              className={cn(
                "p-2 rounded-full transition-all duration-200 hover:scale-110 relative",
                "text-light-text dark:text-dark-text",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              )}
              aria-label="Ver historial"
            >
              <Clock className="w-6 h-6" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full border-2 border-light-bg dark:border-dark-bg flex items-center justify-center text-white text-xs font-bold">
                  {historyCount > 9 ? "9+" : historyCount}
                </span>
              )}
            </button>
          )}

          {/* Divider */}
          <div className="h-6 w-px bg-light-muted/30 dark:bg-dark-muted/30 mx-1" />

          {/* Language Toggle */}
          <LanguageToggle />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
