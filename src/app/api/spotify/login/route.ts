import { NextRequest, NextResponse } from "next/server";

import {
  getSpotifyAuthorizeUrl,
  getSpotifyRedirectUri,
  isSpotifyAppConfigured,
} from "@/lib/spotify";

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

  const origin = request.nextUrl.origin;
  const redirectUri = getSpotifyRedirectUri(origin);

  if (request.nextUrl.searchParams.get("info") === "1") {
    return NextResponse.json({
      redirectUri,
      loginUrl: `${origin}/api/spotify/login`,
      instructions: [
        "Open https://developer.spotify.com/dashboard",
        "Select your app → Settings → Redirect URIs",
        `Add this exact URI: ${redirectUri}`,
        "Save, then visit the login URL again.",
      ],
    });
  }

  const authorizeUrl = getSpotifyAuthorizeUrl("spotify-setup", origin);
  return NextResponse.redirect(authorizeUrl);
}
