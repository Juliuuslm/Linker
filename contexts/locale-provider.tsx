"use client";

import * as React from "react";
import esTranslations from "@/locales/es/common.json";
import enTranslations from "@/locales/en/common.json";

type Locale = "es" | "en";
type Translations = typeof esTranslations;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const LocaleContext = React.createContext<LocaleContextType | undefined>(
  undefined
);

interface LocaleProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

const translations: Record<Locale, Translations> = {
  es: esTranslations,
  en: enTranslations,
};

export function LocaleProvider({
  children,
  defaultLocale = "es",
}: LocaleProviderProps) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);
  const [mounted, setMounted] = React.useState(false);

  // Cargar idioma desde localStorage al montar
  React.useEffect(() => {
    const savedLocale = localStorage.getItem("linkeer-locale") as Locale | null;
    if (savedLocale && (savedLocale === "es" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
    setMounted(true);
  }, []);

  // Guardar idioma en localStorage
  React.useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("linkeer-locale", locale);
    document.documentElement.lang = locale;
  }, [locale, mounted]);

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = React.useCallback(() => {
    setLocaleState((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  const t = translations[locale];

  // Prevenir flash de contenido sin traducción
  if (!mounted) {
    return null;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
