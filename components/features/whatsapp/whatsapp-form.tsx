"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Link as LinkIcon,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { CountrySelector } from "./country-selector";
import { COUNTRIES } from "@/lib/constants/countries";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  WhatsAppFormData,
  WhatsAppLinkResult,
  TextFormatAction,
} from "@/types/whatsapp.types";

interface WhatsAppFormProps {
  onLinkGenerated?: (result: WhatsAppLinkResult) => void;
  onFormChange?: (data: WhatsAppFormData) => void;
  initialData?: WhatsAppFormData;
}

export function WhatsAppForm({
  onLinkGenerated,
  onFormChange,
  initialData,
}: WhatsAppFormProps) {
  const { t } = useLocale();
  const [formData, setFormData] = React.useState<WhatsAppFormData>(
    initialData || {
      country: COUNTRIES[0], // México por defecto
      phone: "",
      message: "",
    }
  );
  const [generatedLink, setGeneratedLink] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Notify parent of form changes
  React.useEffect(() => {
    onFormChange?.(formData);
  }, [formData, onFormChange]);

  // Generate WhatsApp link
  const generateLink = React.useCallback(() => {
    const { country, phone, message } = formData;

    if (!phone.trim()) return "";

    // Clean phone number (remove spaces, dashes, etc)
    const cleanPhone = phone.replace(/\D/g, "");

    // Build wa.me link
    const fullPhone = `${country.code}${cleanPhone}`;
    const encodedMessage = encodeURIComponent(message);
    const link = message
      ? `https://wa.me/${fullPhone}?text=${encodedMessage}`
      : `https://wa.me/${fullPhone}`;

    return link;
  }, [formData]);

  // Update link when form changes
  React.useEffect(() => {
    const link = generateLink();
    setGeneratedLink(link);

    if (link) {
      onLinkGenerated?.({
        url: link,
        displayPhone: `${formData.country.code} ${formData.phone}`,
      });
    }
  }, [formData, generateLink, onLinkGenerated]);

  // Handle text formatting
  const handleFormat = (action: TextFormatAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.message.substring(start, end);

    if (!selectedText) return;

    let formattedText = "";
    switch (action) {
      case "bold":
        formattedText = `*${selectedText}*`;
        break;
      case "italic":
        formattedText = `_${selectedText}_`;
        break;
      case "strikethrough":
        formattedText = `~${selectedText}~`;
        break;
      case "monospace":
        formattedText = `\`\`\`${selectedText}\`\`\``;
        break;
    }

    const newMessage =
      formData.message.substring(0, start) +
      formattedText +
      formData.message.substring(end);

    setFormData((prev) => ({ ...prev, message: newMessage }));

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newEnd = start + formattedText.length;
      textarea.setSelectionRange(newEnd, newEnd);
    }, 0);
  };

  // Copy link to clipboard
  const handleCopy = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Open link in new tab
  const handleOpenLink = () => {
    if (!generatedLink) return;
    window.open(generatedLink, "_blank", "noopener,noreferrer");
  };

  const formatButtons = [
    { action: "bold" as const, icon: Bold, label: "Negrita" },
    { action: "italic" as const, icon: Italic, label: "Cursiva" },
    { action: "strikethrough" as const, icon: Strikethrough, label: "Tachado" },
    { action: "monospace" as const, icon: Code, label: "Monoespaciado" },
  ];

  return (
    <div className="space-y-6">
      {/* Country Selector */}
      <div>
        <label className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text">
          {t.whatsapp.country}
        </label>
        <CountrySelector
          value={formData.country}
          onChange={(country) =>
            setFormData((prev) => ({ ...prev, country }))
          }
        />
      </div>

      {/* Phone Input */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
        >
          {t.whatsapp.phone}
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="1234567890"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="text-lg"
        />
        <p className="mt-1.5 text-xs text-light-muted dark:text-dark-muted">
          {t.whatsapp.phoneHint}
        </p>
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-syne font-semibold mb-2 text-light-text dark:text-dark-text"
        >
          {t.whatsapp.message}{" "}
          <span className="text-light-muted dark:text-dark-muted font-normal">
            ({t.common.optional})
          </span>
        </label>

        {/* Format Buttons */}
        <div className="flex gap-2 mb-2">
          {formatButtons.map((btn) => (
            <button
              key={btn.action}
              type="button"
              onClick={() => handleFormat(btn.action)}
              className={cn(
                "p-2 rounded-lg transition-all duration-200",
                "bg-light-bg dark:bg-dark-bg",
                "border border-light-muted/20 dark:border-dark-muted/20",
                "hover:border-primary/50 hover:bg-primary/5",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
              title={btn.label}
              aria-label={btn.label}
            >
              <btn.icon className="w-4 h-4 text-light-text dark:text-dark-text" />
            </button>
          ))}
        </div>

        <Textarea
          ref={textareaRef}
          id="message"
          placeholder={t.whatsapp.messagePlaceholder}
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          rows={6}
          className="resize-none"
        />
        <p className="mt-1.5 text-xs text-light-muted dark:text-dark-muted">
          {t.whatsapp.messageHint}
        </p>
      </div>

      {/* Generated Link Display */}
      {generatedLink && (
        <div
          className={cn(
            "p-4 rounded-xl animate-fadeIn",
            "bg-primary/5 border-2 border-primary/20"
          )}
        >
          <p className="text-xs font-syne font-semibold mb-2 text-light-text dark:text-dark-text uppercase tracking-wide">
            {t.whatsapp.generatedLink}
          </p>
          <div className="flex items-center gap-2 mb-3">
            <div
              className={cn(
                "flex-1 px-3 py-2 rounded-lg",
                "bg-light-bg dark:bg-dark-bg",
                "border border-light-muted/20 dark:border-dark-muted/20",
                "text-sm text-light-text dark:text-dark-text",
                "break-all font-mono"
              )}
            >
              {generatedLink}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleCopy}
              variant="default"
              size="sm"
              className="flex-1"
            >
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
            <Button
              onClick={handleOpenLink}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {t.common.open}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
