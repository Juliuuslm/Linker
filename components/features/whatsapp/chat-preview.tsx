"use client";

import * as React from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Mic,
  Paperclip,
  Smile,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { WhatsAppFormData } from "@/types/whatsapp.types";

interface ChatPreviewProps {
  formData: WhatsAppFormData;
}

export function ChatPreview({ formData }: ChatPreviewProps) {
  // Format WhatsApp text with markdown-like syntax
  const formatWhatsAppText = (text: string) => {
    if (!text) return null;

    const parts = text.split(
      /(\*[^*]+\*|_[^_]+_|~[^~]+~|```[^`]+```)/g
    );

    return parts.map((part, index) => {
      // Bold: *text*
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <strong key={index} className="font-bold">
            {part.slice(1, -1)}
          </strong>
        );
      }
      // Italic: _text_
      if (part.startsWith("_") && part.endsWith("_")) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      // Strikethrough: ~text~
      if (part.startsWith("~") && part.endsWith("~")) {
        return (
          <span key={index} className="line-through">
            {part.slice(1, -1)}
          </span>
        );
      }
      // Monospace: ```text```
      if (part.startsWith("```") && part.endsWith("```")) {
        return (
          <code
            key={index}
            className="px-1 py-0.5 rounded bg-black/10 font-mono text-sm"
          >
            {part.slice(3, -3)}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const displayName = formData.country.name;
  const displayPhone = formData.phone
    ? `${formData.country.code} ${formData.phone}`
    : formData.country.code;

  return (
    <div className="w-full max-w-[320px] sm:max-w-md mx-auto">
      {/* Phone Frame */}
      <div
        className={cn(
          "relative rounded-[2.5rem] overflow-hidden",
          "bg-black shadow-2xl",
          "border-8 border-black"
        )}
        style={{ aspectRatio: "9/19.5" }}
      >
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />

        {/* WhatsApp Interface */}
        <div className="relative w-full h-full flex flex-col bg-[#ECE5DD]">
          {/* Header */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 shadow-md">
            <ChevronLeft className="w-6 h-6 text-white" />
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-2xl">
              {formData.country.flag}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {displayName}
              </p>
              <p className="text-white/80 text-xs">{displayPhone}</p>
            </div>
            <div className="flex items-center gap-4">
              <Video className="w-5 h-5 text-white" />
              <Phone className="w-5 h-5 text-white" />
              <MoreVertical className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Chat Background */}
          <div
            className="flex-1 overflow-y-auto p-4 wa-pattern"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Message Bubble */}
            {formData.message && (
              <div className="flex justify-end animate-slideUp">
                <div
                  className={cn(
                    "relative max-w-[75%] rounded-lg px-3 py-2",
                    "bg-[#DCF8C6] shadow-sm"
                  )}
                >
                  <p className="text-sm text-gray-800 break-words whitespace-pre-wrap">
                    {formatWhatsAppText(formData.message)}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-gray-500">
                      {new Date().toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {/* WhatsApp checkmarks */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 15"
                      width="16"
                      height="15"
                      className="text-[#53BDEB]"
                    >
                      <path
                        fill="currentColor"
                        d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
                      />
                    </svg>
                  </div>
                  {/* Tail */}
                  <div
                    className="absolute -right-1 bottom-0 w-0 h-0"
                    style={{
                      borderLeft: "8px solid #DCF8C6",
                      borderBottom: "8px solid transparent",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Empty State */}
            {!formData.message && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-2 opacity-50">
                  <div className="w-20 h-20 mx-auto rounded-full bg-white/50 flex items-center justify-center">
                    <Smile className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    Escribe un mensaje para ver
                    <br />
                    la vista previa
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2 border-t border-gray-300">
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Emoji"
            >
              <Smile className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
              <span className="text-sm text-gray-400 select-none">
                Mensaje
              </span>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Adjuntar"
            >
              <Paperclip className="w-6 h-6 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full bg-[#075E54] hover:bg-[#128C7E] transition-colors"
              aria-label="Mensaje de voz"
            >
              <Mic className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Phone Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-light-muted dark:text-dark-muted">
          Vista previa en tiempo real del mensaje de WhatsApp
        </p>
      </div>
    </div>
  );
}
