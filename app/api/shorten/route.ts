import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shortenRequestSchema } from "@/lib/validators/url.validator";
import {
  generateUniqueAlias,
  isAliasAvailable,
} from "@/lib/utils/generate-alias";
import type { ShortenUrlResponse } from "@/types/shortener.types";

/**
 * POST /api/shorten
 * Create a shortened URL
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validation = shortenRequestSchema.safeParse(body);
    if (!validation.success) {
      const error = validation.error.issues[0];
      return NextResponse.json<ShortenUrlResponse>(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: error.message,
          },
        },
        { status: 400 }
      );
    }

    const { originalUrl, customAlias } = validation.data;

    // Determine alias to use
    let alias: string;

    if (customAlias) {
      // Check if custom alias is available
      const available = await isAliasAvailable(customAlias);
      if (!available) {
        return NextResponse.json<ShortenUrlResponse>(
          {
            success: false,
            error: {
              code: "ALIAS_TAKEN",
              message: "Este alias ya está en uso. Por favor elige otro.",
            },
          },
          { status: 409 }
        );
      }
      alias = customAlias.toLowerCase();
    } else {
      // Generate random alias
      const generated = await generateUniqueAlias();
      if (!generated) {
        return NextResponse.json<ShortenUrlResponse>(
          {
            success: false,
            error: {
              code: "GENERATION_FAILED",
              message:
                "No se pudo generar un alias único. Inténtalo de nuevo.",
            },
          },
          { status: 500 }
        );
      }
      alias = generated;
    }

    // Create shortened URL in database
    const shortenedUrl = await prisma.shortenedUrl.create({
      data: {
        alias,
        originalUrl,
        isActive: true,
      },
    });

    // Build short URL
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const host =
      request.headers.get("host") || process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";
    const shortUrl = `${protocol}://${host}/${alias}`;

    // Return response
    return NextResponse.json<ShortenUrlResponse>(
      {
        success: true,
        data: {
          id: shortenedUrl.id,
          alias: shortenedUrl.alias,
          originalUrl: shortenedUrl.originalUrl,
          shortUrl,
          createdAt: shortenedUrl.createdAt,
        },
      },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BASE_URL || "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Error shortening URL:", error);

    return NextResponse.json<ShortenUrlResponse>(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Error interno del servidor. Inténtalo de nuevo más tarde.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/shorten
 * CORS preflight
 */
export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_BASE_URL || "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
