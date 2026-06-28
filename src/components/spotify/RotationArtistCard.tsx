import Image from "next/image";

import RotationCardLink from "@/components/spotify/RotationCardLink";
import type { SpotifyArtist } from "@/lib/spotify";

type RotationArtistCardProps = {
  artist: SpotifyArtist;
};

export default function RotationArtistCard({ artist }: RotationArtistCardProps) {
  return (
    <RotationCardLink
      href={artist.spotifyUrl}
      ariaLabel={`Open ${artist.name} on Spotify`}
      className="flex flex-col"
    >
      <div className="relative aspect-square w-full">
        <Image
          src={artist.imageUrl}
          alt={`${artist.name} artist photo`}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col p-2 sm:p-2.5">
        <h3 className="truncate font-display text-sm font-medium text-on-surface transition-colors group-hover:text-accent">
          {artist.name}
        </h3>

        <p className="mt-1.5 font-label text-[9px] font-medium uppercase tracking-[0.12em] text-on-surface-subtle transition-colors group-hover:text-on-surface-muted">
          via Spotify
        </p>
      </div>
    </RotationCardLink>
  );
}
