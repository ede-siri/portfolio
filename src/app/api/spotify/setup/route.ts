import { NextRequest, NextResponse } from "next/server";

import { getSpotifyRedirectUri, isSpotifyAppConfigured } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;
  const redirectUri = getSpotifyRedirectUri(origin);

  return NextResponse.json({
    configured: isSpotifyAppConfigured(),
    redirectUri,
    loginUrl: `${origin}/api/spotify/login`,
    steps: [
      "Go to https://developer.spotify.com/dashboard",
      "Open your app → Settings",
      "Under Redirect URIs, add the redirectUri value below exactly",
      "Click Save",
      `Visit ${origin}/api/spotify/login`,
    ],
    note: "Spotify does not allow localhost. Use 127.0.0.1 in the dashboard and when visiting /api/spotify/login.",
  });
}
