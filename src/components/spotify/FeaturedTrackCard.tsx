import Image from "next/image";

import RotationCardLink from "@/components/spotify/RotationCardLink";
import SpotifyIcon from "@/components/spotify/SpotifyIcon";
import type { SpotifyTrack } from "@/lib/spotify";

type FeaturedTrackCardProps = {
  track: SpotifyTrack;
  period?: "month" | "recent";
};

export default function FeaturedTrackCard({
  track,
  period = "month",
}: FeaturedTrackCardProps) {
  const label = period === "month" ? "Top this month" : "Recently played";
  return (
    <RotationCardLink
      href={track.spotifyUrl}
      ariaLabel={`Open ${track.title} by ${track.artist} on Spotify`}
      className="min-h-[11.5rem] md:min-h-[12.5rem]"
    >
      <div className="flex h-full flex-col sm:flex-row">
        <div className="relative aspect-square w-full shrink-0 sm:w-[42%] md:max-w-[13.5rem]">
          <Image
            src={track.albumArtUrl}
            alt={`${track.title} album artwork`}
            fill
            sizes="(max-width: 640px) 100vw, 216px"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between p-5 md:p-6">
          <div>
            <p className="font-label text-[10px] font-medium uppercase tracking-[0.14em] text-spotify">
              {label}
            </p>
            <h3 className="mt-2 font-display text-[1.75rem] font-medium leading-tight text-on-surface transition-colors group-hover:text-accent md:text-[2rem]">
              {track.title}
            </h3>
            <p className="mt-1 text-sm text-on-surface-muted">{track.artist}</p>
            <div
              className="mt-5 h-0.5 w-[68%] rounded-full bg-spotify/90"
              aria-hidden="true"
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle transition-colors group-hover:text-on-surface-muted">
              via Spotify
            </span>
            <SpotifyIcon className="h-4 w-4 text-spotify transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>
      </div>
    </RotationCardLink>
  );
}
