import { NextResponse } from "next/server";

import {
  getRotationData,
  PLACEHOLDER_ARTISTS,
  PLACEHOLDER_TRACKS,
  SPOTIFY_PAGE_ARTIST_LIMIT,
} from "@/lib/spotify";

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getRotationData();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      {
        tracks: PLACEHOLDER_TRACKS,
        artists: PLACEHOLDER_ARTISTS.slice(0, SPOTIFY_PAGE_ARTIST_LIMIT),
        source: "placeholder",
        tracksPeriod: "month",
        artistsPeriod: "month",
      },
      { status: 200 },
    );
  }
}
