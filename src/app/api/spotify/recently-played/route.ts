import { NextResponse } from "next/server";

import {
  getRecentlyPlayedFromSpotify,
  PLACEHOLDER_TRACKS,
} from "@/lib/spotify";

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getRecentlyPlayedFromSpotify();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        tracks: PLACEHOLDER_TRACKS,
        source: "placeholder",
      },
      { status: 200 },
    );
  }
}
