"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/hooks/use-theme";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-all duration-300 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "text-light-text dark:text-dark-text"
      )}
      aria-label={
        theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
      }
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 transition-transform duration-300 rotate-0" />
      ) : (
        <Sun className="w-6 h-6 transition-transform duration-300 rotate-180" />
      )}
    </button>
  );
}
