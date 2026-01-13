"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/cn";
import type { QRType, QRUrlData, QRTextData, QREmailData, QRVCardData } from "@/types/qr.types";

interface QRGeneratorProps {
  onValueChange?: (value: string) => void;
  onColorChange?: (color: string) => void;
}

export function QRGenerator({ onValueChange, onColorChange }: QRGeneratorProps) {
  const { t } = useLocale();
  const [activeType, setActiveType] = React.useState<QRType>("url");
  const [color, setColor] = React.useState("#075E54"); // WhatsApp green

  // Form data for each type
  const [urlData, setUrlData] = React.useState<QRUrlData>({ url: "" });
  const [textData, setTextData] = React.useState<QRTextData>({ text: "" });
  const [emailData, setEmailData] = React.useState<QREmailData>({
    email: "",
    subject: "",
    body: "",
  });
  const [vcardData, setVcardData] = React.useState<QRVCardData>({
    name: "",
    phone: "",
    email: "",
    organization: "",
    title: "",
  });

  // Generate QR value based on type
  const generateQRValue = React.useCallback((): string => {
    switch (activeType) {
      case "url":
        return urlData.url.trim();

      case "text":
        return textData.text.trim();

      case "email": {
        if (!emailData.email.trim()) return "";
        const params = new URLSearchParams();
        if (emailData.subject) params.set("subject", emailData.subject);
        if (emailData.body) params.set("body", emailData.body);
        const query = params.toString();
        return `mailto:${emailData.email}${query ? `?${query}` : ""}`;
      }

      case "vcard": {
        if (!vcardData.name.trim()) return "";
        const vcard = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `FN:${vcardData.name}`,
          vcardData.phone && `TEL:${vcardData.phone}`,
          vcardData.email && `EMAIL:${vcardData.email}`,
          vcardData.organization && `ORG:${vcardData.organization}`,
          vcardData.title && `TITLE:${vcardData.title}`,
          "END:VCARD",
        ]
          .filter(Boolean)
          .join("\n");
        return vcard;
      }

      default:
        return "";
    }
  }, [activeType, urlData, textData, emailData, vcardData]);

  // Update parent when value changes
  React.useEffect(() => {
    const value = generateQRValue();
    onValueChange?.(value);
  }, [generateQRValue, onValueChange]);

  // Update parent when color changes
  React.useEffect(() => {
    onColorChange?.(color);
  }, [color, onColorChange]);

  // Predefined colors
  const presetColors = [
    { name: "WhatsApp", color: "#075E54" },
    { name: "Negro", color: "#000000" },
    { name: "Azul", color: "#1E40AF" },
    { name: "Rojo", color: "#DC2626" },
    { name: "Morado", color: "#7C3AED" },
    { name: "Verde", color: "#16A34A" },
  ];

  return (
    <div className="space-y-6">
      {/* Type Selector Tabs */}
      <Tabs value={activeType} onValueChange={(v) => setActiveType(v as QRType)}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full gap-2">
          <TabsTrigger value="url">{t.qr.types.url}</TabsTrigger>
          <TabsTrigger value="text">{t.qr.types.text}</TabsTrigger>
          <TabsTrigger value="email">{t.qr.types.email}</TabsTrigger>
          <TabsTrigger value="vcard">{t.qr.types.vcard}</TabsTrigger>
        </TabsList>

        {/* URL Type */}
        <TabsContent value="url" className="space-y-4">
          <div>
            <label
              htmlFor="qr-url"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.url}
            </label>
            <Input
              id="qr-url"
              type="url"
              placeholder="https://ejemplo.com"
              value={urlData.url}
              onChange={(e) => setUrlData({ url: e.target.value })}
            />
          </div>
        </TabsContent>

        {/* Text Type */}
        <TabsContent value="text" className="space-y-4">
          <div>
            <label
              htmlFor="qr-text"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.text}
            </label>
            <Textarea
              id="qr-text"
              placeholder="Escribe cualquier texto aquí..."
              value={textData.text}
              onChange={(e) => setTextData({ text: e.target.value })}
              rows={6}
            />
          </div>
        </TabsContent>

        {/* Email Type */}
        <TabsContent value="email" className="space-y-4">
          <div>
            <label
              htmlFor="qr-email"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.email}
            </label>
            <Input
              id="qr-email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={emailData.email}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="qr-subject"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.subject}{" "}
              <span className="text-light-muted dark:text-dark-muted font-normal">
                ({t.common.optional})
              </span>
            </label>
            <Input
              id="qr-subject"
              type="text"
              placeholder="Asunto del correo"
              value={emailData.subject}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, subject: e.target.value }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="qr-body"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.body}{" "}
              <span className="text-light-muted dark:text-dark-muted font-normal">
                ({t.common.optional})
              </span>
            </label>
            <Textarea
              id="qr-body"
              placeholder="Mensaje del correo"
              value={emailData.body}
              onChange={(e) =>
                setEmailData((prev) => ({ ...prev, body: e.target.value }))
              }
              rows={4}
            />
          </div>
        </TabsContent>

        {/* vCard Type */}
        <TabsContent value="vcard" className="space-y-4">
          <div>
            <label
              htmlFor="qr-name"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.name}
            </label>
            <Input
              id="qr-name"
              type="text"
              placeholder="Juan Pérez"
              value={vcardData.name}
              onChange={(e) =>
                setVcardData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="qr-vcard-phone"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.phone}{" "}
              <span className="text-light-muted dark:text-dark-muted font-normal">
                ({t.common.optional})
              </span>
            </label>
            <Input
              id="qr-vcard-phone"
              type="tel"
              placeholder="+52 1234567890"
              value={vcardData.phone}
              onChange={(e) =>
                setVcardData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="qr-vcard-email"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.email}{" "}
              <span className="text-light-muted dark:text-dark-muted font-normal">
                ({t.common.optional})
              </span>
            </label>
            <Input
              id="qr-vcard-email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={vcardData.email}
              onChange={(e) =>
                setVcardData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="qr-organization"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.organization}{" "}
              <span className="text-light-muted dark:text-dark-muted font-normal">
                ({t.common.optional})
              </span>
            </label>
            <Input
              id="qr-organization"
              type="text"
              placeholder="Mi Empresa S.A."
              value={vcardData.organization}
              onChange={(e) =>
                setVcardData((prev) => ({
                  ...prev,
                  organization: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label
              htmlFor="qr-title"
              className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
            >
              {t.qr.labels.title}{" "}
              <span className="text-light-muted dark:text-dark-muted font-normal">
                ({t.common.optional})
              </span>
            </label>
            <Input
              id="qr-title"
              type="text"
              placeholder="Director de Ventas"
              value={vcardData.title}
              onChange={(e) =>
                setVcardData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Color Picker */}
      <div>
        <label className="block text-sm font-syne font-semibold mb-3 text-light-text dark:text-dark-text">
          {t.qr.color}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {presetColors.map((preset) => (
            <button
              key={preset.color}
              onClick={() => setColor(preset.color)}
              className={cn(
                "w-full aspect-square rounded-lg transition-all duration-200",
                "border-2 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                color === preset.color
                  ? "border-primary scale-105 shadow-lg"
                  : "border-light-muted/20 dark:border-dark-muted/20"
              )}
              style={{ backgroundColor: preset.color }}
              title={preset.name}
              aria-label={`Color ${preset.name}`}
            />
          ))}
        </div>

        {/* Custom Color Input */}
        <div className="mt-3 flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-light-muted/20 dark:border-dark-muted/20"
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#000000"
            className="flex-1 font-mono"
          />
        </div>
      </div>
    </div>
  );
}
