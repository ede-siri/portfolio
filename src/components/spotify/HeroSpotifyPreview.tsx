"use client";

import { useEffect, useState } from "react";

import SpotifyPreviewCard from "@/components/SpotifyPreviewCard";
import type { SpotifyTrack } from "@/lib/spotify";

export default function HeroSpotifyPreview() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/spotify/currently-listening", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { track?: SpotifyTrack } | null) => {
        if (data?.track) {
          setTrack(data.track);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  return <SpotifyPreviewCard track={track} isLoading={isLoading} />;
}
