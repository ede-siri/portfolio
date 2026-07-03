import Image from "next/image";

import SpotifyIcon from "@/components/spotify/SpotifyIcon";
import type { SpotifyTrack } from "@/lib/spotify";

type SpotifyPreviewCardProps = {
  track?: SpotifyTrack | null;
  isLoading?: boolean;
};

function SpotifyPreviewCardSkeleton() {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <span className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-muted">
          Recently Played
        </span>
        <span className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-subtle">
          <SpotifyIcon className="h-3.5 w-3.5 opacity-50" />
          <span className="hidden sm:inline">via Spotify</span>
        </span>
      </div>

      <div
        className="relative mb-5 flex aspect-square w-full items-center justify-center overflow-hidden bg-surface-elevated"
        aria-hidden="true"
      >
        <div className="absolute inset-0 animate-pulse bg-surface-card" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(155,124,255,0.1)_50%,transparent_70%)] motion-safe:animate-[shimmer_1.8s_ease-in-out_infinite] [background-size:200%_100%]" />
        <div className="relative flex items-end justify-center gap-1.5">
          {[0, 1, 2, 3].map((bar) => (
            <span
              key={bar}
              className="w-1 rounded-full bg-accent/70 motion-safe:animate-[equalizer_1s_ease-in-out_infinite]"
              style={{
                height: `${12 + bar * 4}px`,
                animationDelay: `${bar * 120}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2" aria-hidden="true">
        <div className="h-7 w-3/4 animate-pulse rounded-sm bg-surface-elevated" />
        <div className="h-4 w-1/2 animate-pulse rounded-sm bg-surface-elevated" />
      </div>

      <div className="mt-5 h-px w-full bg-outline">
        <div className="h-px w-[18%] animate-pulse bg-accent/40" />
      </div>
    </>
  );
}

function CardContent({ track }: { track: SpotifyTrack }) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <span className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-on-surface-muted">
          Recently Played
        </span>
        <span className="flex items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.1em] text-spotify">
          <SpotifyIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">via Spotify</span>
        </span>
      </div>

      <div className="relative mb-5 aspect-square w-full overflow-hidden bg-surface-elevated">
        <Image
          src={track.albumArtUrl}
          alt={`${track.title} album artwork`}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="space-y-1">
        <p className="font-display text-2xl font-medium leading-tight text-on-surface">
          {track.title}
        </p>
        <p className="text-sm text-on-surface-muted">
          {track.artist}
          <span className="text-on-surface-muted"> · {track.album}</span>
        </p>
      </div>

      <div className="mt-5 h-px w-full bg-outline">
        <div className="h-px w-[38%] bg-accent transition-all duration-500 group-hover:w-[52%]" />
      </div>
    </>
  );
}

export default function SpotifyPreviewCard({
  track,
  isLoading = false,
}: SpotifyPreviewCardProps) {
  const className =
    "group block border border-outline bg-surface-card p-5 transition-colors duration-300 hover:border-outline-strong hover:bg-surface-elevated";

  if (isLoading || !track) {
    return (
      <div
        className={className}
        aria-busy="true"
        aria-label="Loading recently played track"
      >
        <SpotifyPreviewCardSkeleton />
      </div>
    );
  }

  if (track.spotifyUrl) {
    return (
      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Open ${track.title} by ${track.artist} on Spotify`}
      >
        <CardContent track={track} />
      </a>
    );
  }

  return (
    <div className={className}>
      <CardContent track={track} />
    </div>
  );
}
