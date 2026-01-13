import type { Metadata } from "next";
import { Quicksand, Syne } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/contexts/theme-provider";
import { LocaleProvider } from "@/contexts/locale-provider";
import "./globals.css";

const kangge = localFont({
  src: "../public/fonts/Kangge.woff2",
  variable: "--font-kangge",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "LINKER - Simplifica Tus Conexiones",
    template: "%s | LINKER"
  },
  description:
    "La herramienta todo en uno para creadores digitales. Genera enlaces de WhatsApp, códigos QR y URLs cortas en segundos.",
  keywords: [
    "WhatsApp",
    "QR Code",
    "URL Shortener",
    "Link Generator",
    "Digital Tools",
    "Herramientas digitales",
    "Generador de enlaces",
    "Códigos QR",
    "Acortador de URLs",
  ],
  authors: [{ name: "LINKER Team" }],
  creator: "LINKER",
  publisher: "LINKER",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "LINKER",
    title: "LINKER - Simplifica Tus Conexiones",
    description:
      "La herramienta todo en uno para creadores digitales. Genera enlaces de WhatsApp, códigos QR y URLs cortas en segundos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LINKER - Plataforma de herramientas digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LINKER - Simplifica Tus Conexiones",
    description:
      "La herramienta todo en uno para creadores digitales. Genera enlaces de WhatsApp, códigos QR y URLs cortas en segundos.",
    images: ["/og-image.png"],
    creator: "@linker",
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
    languages: {
      "es-ES": process.env.NEXT_PUBLIC_BASE_URL,
      "en-US": `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "LINKER",
              "description": "La herramienta todo en uno para creadores digitales. Genera enlaces de WhatsApp, códigos QR y URLs cortas en segundos.",
              "url": process.env.NEXT_PUBLIC_BASE_URL,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1000"
              }
            })
          }}
        />
      </head>
      <body
        className={`${kangge.variable} ${quicksand.variable} ${syne.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="light">
          <LocaleProvider defaultLocale="es">{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
