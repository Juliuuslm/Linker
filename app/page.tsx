"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { useLocale } from "@/lib/hooks/use-locale";
import { useTheme } from "@/lib/hooks/use-theme";

export default function Home() {
  const { t } = useLocale();
  const { theme } = useTheme();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Header con toggles */}
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <LanguageToggle />
        <ThemeToggle />
      </div>

      {/* Contenido principal */}
      <div className="text-center space-y-6 p-8 max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-kangge font-bold text-light-text dark:text-dark-text transition-colors duration-300">
          LINKER<span className="text-primary">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto transition-colors duration-300 font-syne font-semibold">
          {t.hero.title}
        </p>
        <p className="text-base text-light-muted dark:text-dark-muted max-w-3xl mx-auto transition-colors duration-300">
          {t.hero.description}
        </p>

        {/* Indicadores de estado */}
        <div className="flex items-center justify-center gap-6 pt-8">
          <div className="px-4 py-2 rounded-full bg-light-text/5 dark:bg-dark-text/5 border border-light-muted/20 dark:border-dark-muted/20">
            <span className="text-sm font-syne font-bold text-light-muted dark:text-dark-muted">
              Tema: {theme === "light" ? "☀️ Claro" : "🌙 Oscuro"}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="pt-12 space-y-2">
          <p className="text-sm text-green-600 dark:text-green-400 font-bold">
            ✅ FASE 1: Setup Base
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 font-bold">
            ✅ FASE 2: Componentes UI
          </p>
          <p className="text-sm text-primary font-bold animate-pulse">
            🚀 FASE 3: Temas e i18n - En Progreso
          </p>
        </div>
      </div>
    </main>
  );
}
