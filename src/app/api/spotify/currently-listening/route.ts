import { NextResponse } from "next/server";

import {
  getCurrentlyListeningForHero,
  PLACEHOLDER_TRACKS,
} from "@/lib/spotify";

export const revalidate = 300;

export async function GET() {
  try {
    const track = await getCurrentlyListeningForHero();

    return NextResponse.json(
      { track },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch {
    return NextResponse.json({ track: PLACEHOLDER_TRACKS[0] });
  }
}
