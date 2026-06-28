"use client";

import { useEffect, useState } from "react";

import PathLabel from "@/components/PathLabel";
import FeaturedTrackCard from "@/components/spotify/FeaturedTrackCard";
import RotationArtistCard from "@/components/spotify/RotationArtistCard";
import RotationTrackCard from "@/components/spotify/RotationTrackCard";
import {
  type RotationDataResponse,
  type SpotifyArtist,
  type SpotifyTrack,
} from "@/lib/spotify";

type RotationTab = "songs" | "artists";

function RotationTabButton({
  tab,
  activeTab,
  onSelect,
}: {
  tab: RotationTab;
  activeTab: RotationTab;
  onSelect: (tab: RotationTab) => void;
}) {
  const isActive = tab === activeTab;
  const label = tab === "songs" ? "/songs" : "/artists";

  return (
    <button
      type="button"
      onClick={() => onSelect(tab)}
      aria-pressed={isActive}
      className={`font-mono text-sm transition-colors duration-300 ${
        isActive
          ? "border border-outline-strong bg-surface-elevated text-on-surface"
          : "border border-outline text-on-surface-muted hover:border-outline-strong hover:text-on-surface"
      } px-3 py-1.5`}
    >
      [ {label} ]
    </button>
  );
}

export default function RecentlyInRotation() {
  const [activeTab, setActiveTab] = useState<RotationTab>("songs");
  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [tracksPeriod, setTracksPeriod] = useState<"month" | "recent">("month");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/spotify/rotation", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: RotationDataResponse | null) => {
        if (data?.tracks?.length) {
          setTracks(data.tracks);
        }
        if (data?.artists?.length) {
          setArtists(data.artists);
        }
        if (data?.tracksPeriod) {
          setTracksPeriod(data.tracksPeriod);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  const featuredTrack = tracks[0];
  const secondaryTracks = tracks.slice(1, 4);
  const topArtists = artists.slice(0, 3);

  return (
    <section className="py-20 md:py-28" aria-labelledby="rotation-heading">
      <div className="mx-auto max-w-[1280px] px-5 md:px-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <PathLabel path="~/edesiri/listening" className="mb-4" />
            <h2
              id="rotation-heading"
              className="mb-4 font-display text-[40px] font-medium leading-tight text-on-surface md:text-[48px]"
            >
              Recently in Rotation
            </h2>
            <p className="max-w-sm text-lg leading-8 text-on-surface-muted">
              The songs and artists that have had me in a chokehold this month.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <RotationTabButton
                tab="songs"
                activeTab={activeTab}
                onSelect={setActiveTab}
              />
              <RotationTabButton
                tab="artists"
                activeTab={activeTab}
                onSelect={setActiveTab}
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            {activeTab === "songs" ? (
              <div
                className={`space-y-4 md:space-y-5 ${isLoading ? "opacity-80" : ""}`}
              >
                {featuredTrack ? (
                  <FeaturedTrackCard
                    track={featuredTrack}
                    period={tracksPeriod}
                  />
                ) : null}

                {secondaryTracks.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
                    {secondaryTracks.map((track) => (
                      <RotationTrackCard key={track.id} track={track} />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5 ${isLoading ? "opacity-80" : ""}`}
              >
                {topArtists.map((artist) => (
                  <RotationArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
