"use client";

import { useEffect, useState } from "react";

import SpotifyPreviewCard from "@/components/SpotifyPreviewCard";
import { PLACEHOLDER_TRACKS, type SpotifyTrack } from "@/lib/spotify";

export default function HeroSpotifyPreview() {
  const [track, setTrack] = useState<SpotifyTrack>(PLACEHOLDER_TRACKS[0]);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/spotify/currently-listening", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { track?: SpotifyTrack } | null) => {
        if (data?.track) {
          setTrack(data.track);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return <SpotifyPreviewCard track={track} />;
}
