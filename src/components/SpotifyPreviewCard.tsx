import Image from "next/image";

import SpotifyIcon from "@/components/spotify/SpotifyIcon";
import type { SpotifyTrack } from "@/lib/spotify";

type SpotifyPreviewCardProps = {
  track: SpotifyTrack;
};

function CardContent({ track }: SpotifyPreviewCardProps) {
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

export default function SpotifyPreviewCard({ track }: SpotifyPreviewCardProps) {
  const className =
    "group block border border-outline bg-surface-card p-5 transition-colors duration-300 hover:border-outline-strong hover:bg-surface-elevated";

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
