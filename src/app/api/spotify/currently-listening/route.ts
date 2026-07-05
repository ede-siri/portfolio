import { NextResponse } from "next/server";

import {
  getHeroRecentlyPlayedTrack,
  HERO_RECENTLY_PLAYED_REVALIDATE_SECONDS,
  PLACEHOLDER_TRACKS,
} from "@/lib/spotify";

export const revalidate = 7200;

export async function GET() {
  try {
    const track = await getHeroRecentlyPlayedTrack();

    return NextResponse.json(
      { track },
      {
        headers: {
          "Cache-Control": `s-maxage=${HERO_RECENTLY_PLAYED_REVALIDATE_SECONDS}, stale-while-revalidate=${HERO_RECENTLY_PLAYED_REVALIDATE_SECONDS * 2}`,
        },
      },
    );
  } catch {
    return NextResponse.json({ track: PLACEHOLDER_TRACKS[0] });
  }
}
