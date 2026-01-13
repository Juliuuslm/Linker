"use client";

import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/hooks/use-locale";
import { cn } from "@/lib/utils/cn";
import type { QRFormat } from "@/types/qr.types";

interface QRCanvasProps {
  value: string;
  color: string;
  size: number;
}

export function QRCanvas({ value, color, size }: QRCanvasProps) {
  const { t } = useLocale();
  const qrRef = React.useRef<HTMLDivElement>(null);

  // Download QR code as PNG
  const downloadPNG = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    // Create canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size with padding
    const padding = 40;
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2;

    // White background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Convert SVG to image
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, padding, padding, size, size);
      URL.revokeObjectURL(url);

      // Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.download = `qr-code-${Date.now()}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      });
    };
    img.src = url;
  };

  // Download QR code as SVG
  const downloadSVG = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* QR Code Display */}
      <div
        className={cn(
          "p-4 sm:p-6 md:p-8 rounded-2xl flex items-center justify-center",
          "bg-white border-2 border-light-muted/20 dark:border-dark-muted/20",
          "animate-fadeIn"
        )}
      >
        <div
          ref={qrRef}
          className="bg-white p-6 rounded-xl shadow-lg"
          style={{
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <QRCodeSVG
            value={value || "https://linkeer.com"}
            size={size}
            fgColor={color}
            bgColor="#FFFFFF"
            level="H"
            includeMargin={false}
          />
        </div>
      </div>

      {/* Download Buttons */}
      {value && (
        <div className="grid grid-cols-2 gap-3 animate-slideUp">
          <Button onClick={downloadPNG} variant="default" size="md">
            <Download className="w-4 h-4 mr-2" />
            PNG
          </Button>
          <Button onClick={downloadSVG} variant="outline" size="md">
            <Download className="w-4 h-4 mr-2" />
            SVG
          </Button>
        </div>
      )}

      {/* Info Text */}
      {value && (
        <p className="text-xs text-center text-light-muted dark:text-dark-muted">
          Haz clic en PNG o SVG para descargar el código QR
        </p>
      )}
    </div>
  );
}
