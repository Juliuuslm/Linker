import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={quicksand.variable} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
