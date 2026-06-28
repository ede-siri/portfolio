import Image from "next/image";

import RotationCardLink from "@/components/spotify/RotationCardLink";
import type { SpotifyTrack } from "@/lib/spotify";

type RotationTrackCardProps = {
  track: SpotifyTrack;
};

export default function RotationTrackCard({ track }: RotationTrackCardProps) {
  return (
    <RotationCardLink
      href={track.spotifyUrl}
      ariaLabel={`Open ${track.title} by ${track.artist} on Spotify`}
      className="flex min-h-[17rem] flex-col md:min-h-[18rem]"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={track.albumArtUrl}
          alt={`${track.title} album artwork`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 md:p-5">
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl font-medium text-on-surface transition-colors group-hover:text-accent">
            {track.title}
          </h3>
          <p className="mt-1 truncate text-sm text-on-surface-muted">
            {track.artist}
          </p>
        </div>

        <p className="mt-4 font-label text-[10px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle transition-colors group-hover:text-on-surface-muted">
          via Spotify
        </p>
      </div>
    </RotationCardLink>
  );
}
