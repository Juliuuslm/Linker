"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/lib/hooks/use-locale";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { WhatsAppForm } from "@/components/features/whatsapp/whatsapp-form";
import { ChatPreview } from "@/components/features/whatsapp/chat-preview";
import { QRGenerator } from "@/components/features/qr/qr-generator";
import { QRCanvas } from "@/components/features/qr/qr-canvas";
import type { WhatsAppFormData } from "@/types/whatsapp.types";

export default function Home() {
  const { t } = useLocale();
  const [showHistory, setShowHistory] = React.useState(false);
  const [activeTool, setActiveTool] = React.useState("whatsapp");

  // WhatsApp state
  const [whatsappData, setWhatsappData] = React.useState<WhatsAppFormData>({
    country: { code: "+52", iso: "🇲🇽", name: "México" },
    phone: "",
    message: "",
  });

  // QR state
  const [qrValue, setQrValue] = React.useState("");
  const [qrColor, setQrColor] = React.useState("#075E54");

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
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-24">
          <div className="space-y-4 mb-12 text-center">
            <h2 className="text-4xl md:text-6xl font-syne font-extrabold leading-tight tracking-tight text-light-text dark:text-dark-text">
              {t.hero.title}
              <span className="text-primary">.</span>
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto text-light-muted dark:text-dark-muted">
              {t.hero.description}
            </p>
          </div>

          {/* Tool Tabs */}
          <Tabs value={activeTool} onValueChange={setActiveTool} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="whatsapp">{t.tabs.whatsapp}</TabsTrigger>
              <TabsTrigger value="qr">{t.tabs.qr}</TabsTrigger>
              <TabsTrigger value="shortener">{t.tabs.shortener}</TabsTrigger>
            </TabsList>

            {/* WhatsApp Tab */}
            <TabsContent value="whatsapp" className="mt-0">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Form Column */}
                <Card className="p-6 md:p-8 animate-fadeIn">
                  <div className="mb-6">
                    <h3 className="text-2xl font-syne font-bold text-light-text dark:text-dark-text mb-2">
                      {t.whatsapp.title}
                    </h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted">
                      {t.whatsapp.description}
                    </p>
                  </div>
                  <WhatsAppForm onFormChange={setWhatsappData} />
                </Card>

                {/* Preview Column */}
                <div
                  className="lg:sticky lg:top-24 animate-fadeIn"
                  style={{ animationDelay: "150ms" }}
                >
                  <Card className="p-6 md:p-8">
                    <ChatPreview formData={whatsappData} />
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* QR Tab */}
            <TabsContent value="qr" className="mt-0">
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Form Column */}
                <Card className="p-6 md:p-8 animate-fadeIn">
                  <div className="mb-6">
                    <h3 className="text-2xl font-syne font-bold text-light-text dark:text-dark-text mb-2">
                      Creador de Códigos QR
                    </h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted">
                      Genera códigos QR personalizados para URLs, texto, emails
                      o tarjetas de contacto.
                    </p>
                  </div>
                  <QRGenerator
                    onValueChange={setQrValue}
                    onColorChange={setQrColor}
                  />
                </Card>

                {/* Preview Column */}
                <div
                  className="lg:sticky lg:top-24 animate-fadeIn"
                  style={{ animationDelay: "150ms" }}
                >
                  <Card className="p-6 md:p-8">
                    <QRCanvas value={qrValue} color={qrColor} size={200} />
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Shortener Tab (Placeholder) */}
            <TabsContent value="shortener" className="mt-0">
              <Card className="p-12 text-center animate-fadeIn">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">🔗</span>
                  </div>
                  <h3 className="text-2xl font-syne font-bold text-light-text dark:text-dark-text">
                    Acortador de URLs
                  </h3>
                  <p className="text-light-muted dark:text-dark-muted">
                    El acortador de URLs se implementará en la siguiente fase.
                    Pronto podrás crear enlaces cortos personalizados.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
