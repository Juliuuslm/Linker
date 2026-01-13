import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

interface RedirectPageProps {
  params: Promise<{
    alias: string;
  }>;
}

/**
 * Dynamic metadata for SEO
 */
export async function generateMetadata({
  params,
}: RedirectPageProps): Promise<Metadata> {
  const { alias } = await params;

  return {
    title: `Redireccionando... | LINKER`,
    description: `Redireccionando desde /${alias}`,
    robots: "noindex, nofollow",
  };
}

/**
 * Dynamic route for shortened URL redirection
 * Handles /:alias and redirects to original URL
 */
export default async function RedirectPage({ params }: RedirectPageProps) {
  const { alias } = await params;

  // Lookup shortened URL in database
  const shortenedUrl = await prisma.shortenedUrl.findUnique({
    where: { alias: alias.toLowerCase() },
  });

  // If not found or inactive, show 404
  if (!shortenedUrl || !shortenedUrl.isActive) {
    notFound();
  }

  // Increment click count with await to prevent race condition
  try {
    await prisma.shortenedUrl.update({
      where: { id: shortenedUrl.id },
      data: {
        clickCount: { increment: 1 },
        lastClickAt: new Date(),
      },
    });
  } catch (error) {
    // Log error but don't block redirect
    console.error("Error updating click count:", error);
    // TODO: Implementar queue de retry en producción
  }

  // Redirect to original URL
  redirect(shortenedUrl.originalUrl);
}
