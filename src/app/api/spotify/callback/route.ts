import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

import { exchangeSpotifyCode, isSpotifyAppConfigured } from "@/lib/spotify";

async function saveRefreshTokenToEnvLocal(refreshToken: string) {
  const envPath = path.join(process.cwd(), ".env.local");
  const current = await readFile(envPath, "utf8").catch(() => "");
  const line = `SPOTIFY_REFRESH_TOKEN=${refreshToken}`;
  const updated = current.includes("SPOTIFY_REFRESH_TOKEN=")
    ? current.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, line)
    : `${current.trimEnd()}${current ? "\n" : ""}${line}\n`;

  await writeFile(envPath, updated, "utf8");
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!isSpotifyAppConfigured()) {
    return NextResponse.json(
      {
        error:
          "Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local first.",
      },
      { status: 400 },
    );
  }

  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization failed: ${error}` },
      { status: 400 },
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code." },
      { status: 400 },
    );
  }

  try {
    const tokens = await exchangeSpotifyCode(code, request.nextUrl.origin);

    if (!tokens.refreshToken) {
      return NextResponse.json(
        {
          error:
            "Spotify did not return a refresh token. Revoke app access in your Spotify account settings and try again.",
        },
        { status: 400 },
      );
    }

    try {
      await saveRefreshTokenToEnvLocal(tokens.refreshToken);
    } catch {
      // Fall back to manual copy if the env file cannot be updated.
    }

    return NextResponse.json({
      message:
        "Spotify connected. SPOTIFY_REFRESH_TOKEN was saved to .env.local. Restart the dev server if rotation data does not update.",
      refreshToken: tokens.refreshToken,
      env: `SPOTIFY_REFRESH_TOKEN=${tokens.refreshToken}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to exchange Spotify authorization code." },
      { status: 500 },
    );
  }
}
