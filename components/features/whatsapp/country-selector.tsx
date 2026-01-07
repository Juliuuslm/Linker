"use client";

import * as React from "react";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES, type Country } from "@/lib/constants/countries";
import { cn } from "@/lib/utils/cn";

interface CountrySelectorProps {
  value: Country;
  onChange: (country: Country) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Filter countries by search
  const filteredCountries = React.useMemo(() => {
    if (!search) return COUNTRIES;
    const query = search.toLowerCase();
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.includes(query)
    );
  }, [search]);

  const handleSelect = (country: Country) => {
    onChange(country);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl",
          "bg-light-bg dark:bg-dark-bg",
          "border-2 border-light-muted/20 dark:border-dark-muted/20",
          "text-light-text dark:text-dark-text",
          "hover:border-primary/50 transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
        aria-label="Seleccionar país"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{value.iso}</span>
          <span className="font-medium">{value.code}</span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full mt-2 rounded-xl overflow-hidden",
            "bg-light-bg dark:bg-dark-bg",
            "border-2 border-light-muted/20 dark:border-dark-muted/20",
            "shadow-2xl animate-slideUp"
          )}
        >
          {/* Search Input */}
          <div className="p-3 border-b border-light-muted/10 dark:border-dark-muted/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
              <input
                type="text"
                placeholder="Buscar país..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-lg",
                  "bg-light-bg dark:bg-dark-bg",
                  "border border-light-muted/20 dark:border-dark-muted/20",
                  "text-light-text dark:text-dark-text",
                  "placeholder:text-light-muted dark:placeholder:text-dark-muted",
                  "focus:outline-none focus:ring-2 focus:ring-primary"
                )}
                autoFocus
              />
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.iso}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3",
                    "text-left transition-colors duration-150",
                    "hover:bg-primary/10",
                    value.iso === country.iso &&
                      "bg-primary/20 font-semibold"
                  )}
                >
                  <span className="text-2xl">{country.iso}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-light-text dark:text-dark-text truncate">
                      {country.name}
                    </p>
                    <p className="text-sm text-light-muted dark:text-dark-muted">
                      {country.code}
                    </p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-light-muted dark:text-dark-muted">
                No se encontraron países
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
