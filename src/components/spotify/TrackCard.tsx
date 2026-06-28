import Image from "next/image";

import SpotifyIcon from "@/components/spotify/SpotifyIcon";
import type { SpotifyTrack } from "@/lib/spotify";

type TrackCardProps = {
  track: SpotifyTrack;
};

function TrackCardContent({ track }: TrackCardProps) {
  return (
    <>
      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-surface-elevated">
        <Image
          src={track.albumArtUrl}
          alt={`${track.title} album artwork`}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-medium text-on-surface transition-colors group-hover:text-accent">
          {track.title}
        </p>
        <p className="truncate text-sm text-on-surface-muted">{track.artist}</p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-subtle transition-colors group-hover:text-spotify">
        <SpotifyIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">via Spotify</span>
      </div>
    </>
  );
}

export default function TrackCard({ track }: TrackCardProps) {
  const className =
    "group flex items-center gap-4 border border-outline bg-surface-card p-4 transition-all duration-300 hover:border-outline-strong hover:bg-surface-elevated";

  if (track.spotifyUrl) {
    return (
      <a
        href={track.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Open ${track.title} by ${track.artist} on Spotify`}
      >
        <TrackCardContent track={track} />
      </a>
    );
  }

  return (
    <div
      className={className}
      aria-label={`${track.title} by ${track.artist}`}
    >
      <TrackCardContent track={track} />
    </div>
  );
}
