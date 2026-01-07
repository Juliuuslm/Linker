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
  title: "LINKER - Simplifica Tus Conexiones",
  description:
    "La herramienta todo en uno para creadores digitales. Genera enlaces de WhatsApp, códigos QR y URLs cortas en segundos.",
  keywords: [
    "WhatsApp",
    "QR Code",
    "URL Shortener",
    "Link Generator",
    "Digital Tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
