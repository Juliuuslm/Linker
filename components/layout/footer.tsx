"use client";

import * as React from "react";
import Link from "next/link";
import { LinkIcon, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { useLocale } from "@/lib/hooks/use-locale";

export function Footer() {
  const { t } = useLocale();

  const footerLinks = {
    product: [
      { label: t.tabs.whatsapp, href: "#whatsapp" },
      { label: t.tabs.qr, href: "#qr" },
      { label: t.tabs.shortener, href: "#shortener" },
      { label: t.footer.links.features, href: "#features" },
      { label: t.footer.links.pricing, href: "#pricing" },
    ],
    legal: [
      { label: t.footer.links.privacy, href: "#privacy" },
      { label: t.footer.links.terms, href: "#terms" },
      { label: t.footer.links.api, href: "#api" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="w-full pt-16 pb-8 border-t border-light-muted/10 dark:border-dark-muted/10 bg-light-bg/50 dark:bg-dark-bg/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transform rotate-3 bg-primary shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <LinkIcon className="text-white w-5 h-5" />
              </div>
              <h3 className="text-xl font-kangge font-bold tracking-wider text-light-text dark:text-dark-text">
                LINKER
              </h3>
            </Link>
            <p className="text-sm leading-relaxed text-light-muted dark:text-dark-muted opacity-80">
              {t.hero.description}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-syne font-bold mb-4 text-light-text dark:text-dark-text">
              {t.footer.product}
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-syne font-bold mb-4 text-light-text dark:text-dark-text">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-light-muted dark:text-dark-muted hover:text-primary dark:hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-syne font-bold mb-4 text-light-text dark:text-dark-text">
              {t.footer.social}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-light-text/5 dark:bg-dark-text/5 hover:bg-light-text/10 dark:hover:bg-dark-text/10 text-light-text dark:text-dark-text hover:text-primary dark:hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light-muted/10 dark:border-dark-muted/10 pt-8 text-center">
          <p className="font-syne font-medium text-sm text-light-muted dark:text-dark-muted opacity-60">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
