"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/lib/hooks/use-locale";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { t } = useLocale();
  const [showHistory, setShowHistory] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      {/* Header */}
      <Header
        onHistoryClick={() => setShowHistory(!showHistory)}
        historyCount={0}
      />

      {/* Main Content */}
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 text-center">
          <div className="space-y-4 mb-16">
            <h2 className="text-5xl md:text-7xl font-syne font-extrabold leading-tight tracking-tight text-light-text dark:text-dark-text">
              {t.hero.title}
              <span className="text-primary">.</span>
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto text-light-muted dark:text-dark-muted">
              {t.hero.description}
            </p>
          </div>

          {/* Tool Container (Placeholder) */}
          <Card className="p-8 md:p-12 min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-syne font-bold text-light-text dark:text-dark-text">
                  Próximamente
                </p>
                <p className="text-sm text-light-muted dark:text-dark-muted max-w-md mx-auto">
                  Las herramientas de WhatsApp, QR y Acortador se implementarán
                  en las siguientes fases
                </p>
              </div>

              {/* Progress */}
              <div className="pt-8 space-y-2 text-left max-w-md mx-auto">
                <p className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400"></span>
                  ✅ FASE 1: Setup Base
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400"></span>
                  ✅ FASE 2: Componentes UI
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400"></span>
                  ✅ FASE 3: Temas e i18n
                </p>
                <p className="text-xs text-primary font-bold flex items-center gap-2 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  🚀 FASE 4: Header y Footer - En Progreso
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
