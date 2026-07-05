import { cache } from "react";
import { unstable_cache } from "next/cache";

export type SpotifyTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumArtUrl: string;
  spotifyUrl?: string;
  playedAt?: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  imageUrl: string;
  spotifyUrl?: string;
};

export type RecentlyPlayedResponse = {
  tracks: SpotifyTrack[];
  source: "spotify" | "placeholder";
};

export type TopTracksResponse = {
  tracks: SpotifyTrack[];
  source: "spotify" | "placeholder";
};

export type TopArtistsResponse = {
  artists: SpotifyArtist[];
  source: "spotify" | "placeholder";
};

export type RotationDataResponse = {
  tracks: SpotifyTrack[];
  artists: SpotifyArtist[];
  source: "spotify" | "placeholder";
  tracksPeriod: "month" | "recent";
  artistsPeriod: "month" | "recent";
};

/** Hero "Recently Played" card — refresh interval (not live playback). */
export const HERO_RECENTLY_PLAYED_REVALIDATE_SECONDS = 7200;

export const PLACEHOLDER_TRACKS: SpotifyTrack[] = [
  {
    id: "3OHfY25jxYVT3EFPeYx5cM",
    title: "Kill Bill",
    artist: "SZA",
    album: "SOS",
    albumArtUrl:
      "https://i.scdn.co/image/ab67616d0000b27393259362d779a6564c5c457",
    spotifyUrl: "https://open.spotify.com/track/3OHfY25jxYVT3EFPeYx5cM",
  },
  {
    id: "1MoCvf2kzB3f5eXk6Q9e8n",
    title: "Free Mind",
    artist: "Tems",
    album: "For Broken Ears",
    albumArtUrl:
      "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d314",
    spotifyUrl: "https://open.spotify.com/track/1MoCvf2kzB3f5eXk6Q9e8n",
  },
  {
    id: "0QHEnW2wFfa0f6P2xY7F4t",
    title: "Last Last",
    artist: "Burna Boy",
    album: "Love, Damini",
    albumArtUrl:
      "https://i.scdn.co/image/ab67616d0000b273cc02fed0bac5d7e80b9a0c57",
    spotifyUrl: "https://open.spotify.com/track/0QHEnW2wFfa0f6P2xY7F4t",
  },
  {
    id: "2tudvzsbWxfXvfLR0Gl62g",
    title: "United In Grief",
    artist: "Kendrick Lamar",
    album: "Mr. Morale & The Big Steppers",
    albumArtUrl:
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa5b562f35b53",
    spotifyUrl: "https://open.spotify.com/track/2tudvzsbWxfXvfLR0Gl62g",
  },
];

export const PLACEHOLDER_ARTISTS: SpotifyArtist[] = [
  {
    id: "sza",
    name: "SZA",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27393259362d779a6564c5c457",
    spotifyUrl: "https://open.spotify.com/artist/4tZwfgrHOc3mvqY2ELEvQs",
  },
  {
    id: "tems",
    name: "Tems",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d314",
    spotifyUrl: "https://open.spotify.com/artist/687cZJR45JOv3boFhTroWm",
  },
  {
    id: "burna-boy",
    name: "Burna Boy",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273cc02fed0bac5d7e80b9a0c57",
    spotifyUrl: "https://open.spotify.com/artist/3wcj11K77LjSz7SRMON192",
  },
  {
    id: "kendrick-lamar",
    name: "Kendrick Lamar",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa5b562f35b53",
    spotifyUrl: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
  },
];

export const SPOTIFY_SCOPES = [
  "user-read-recently-played",
  "user-read-currently-playing",
  "user-top-read",
] as const;

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played";
const SPOTIFY_CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const SPOTIFY_TOP_TRACKS_URL = "https://api.spotify.com/v1/me/top/tracks";
const SPOTIFY_TOP_ARTISTS_URL = "https://api.spotify.com/v1/me/top/artists";
const SPOTIFY_FETCH_TIMEOUT_MS = 4_000;
const SPOTIFY_PAGE_TRACK_LIMIT = 4;
export const SPOTIFY_PAGE_ARTIST_LIMIT = 3;

type SpotifyRecentlyPlayedItem = {
  played_at: string;
  track: {
    id: string;
    name: string;
    artists: Array<{ id: string; name: string }>;
    album: {
      name: string;
      images: Array<{ url: string; height: number | null; width: number | null }>;
    };
    external_urls: {
      spotify?: string;
    };
  };
};

type SpotifyRecentlyPlayedResponse = {
  items: SpotifyRecentlyPlayedItem[];
};

type SpotifyTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs = SPOTIFY_FETCH_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

function placeholderResponse(limit: number): RecentlyPlayedResponse {
  return {
    tracks: PLACEHOLDER_TRACKS.slice(0, limit),
    source: "placeholder",
  };
}

function getSpotifyAppCredentials() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return null;
  }

  return { clientId, clientSecret };
}

function getSpotifyCredentials() {
  const appCredentials = getSpotifyAppCredentials();
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!appCredentials || !refreshToken) {
    return null;
  }

  return { ...appCredentials, refreshToken };
}

function mapSpotifyApiTrack(
  track: SpotifyRecentlyPlayedItem["track"],
): SpotifyTrack | null {
  const albumArtUrl = track.album.images[0]?.url;

  if (!albumArtUrl) {
    return null;
  }

  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumArtUrl,
    spotifyUrl: track.external_urls.spotify,
  };
}

function mapRecentlyPlayedItem(
  item: SpotifyRecentlyPlayedItem,
): SpotifyTrack | null {
  const track = mapSpotifyApiTrack(item.track);
  if (!track) {
    return null;
  }

  return { ...track, playedAt: item.played_at };
}

function dedupeTracks(tracks: SpotifyTrack[], limit = 4): SpotifyTrack[] {
  const seen = new Set<string>();
  const unique: SpotifyTrack[] = [];

  for (const track of tracks) {
    if (seen.has(track.id)) {
      continue;
    }

    seen.add(track.id);
    unique.push(track);

    if (unique.length >= limit) {
      break;
    }
  }

  return unique;
}

async function getAccessToken(): Promise<string> {
  const credentials = getSpotifyCredentials();
  if (!credentials) {
    throw new Error("Spotify credentials are not configured.");
  }

  if (cachedAccessToken && Date.now() < tokenExpiresAt) {
    return cachedAccessToken;
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: credentials.refreshToken,
  });

  const response = await fetchWithTimeout(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${credentials.clientId}:${credentials.clientSecret}`,
      ).toString("base64")}`,
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify token refresh failed (${response.status}).`);
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  cachedAccessToken = data.access_token;
  tokenExpiresAt = Date.now() + data.expires_in * 1000 - 60_000;

  return data.access_token;
}

async function fetchRecentlyPlayedTracks(
  accessToken: string,
  limit = 4,
): Promise<SpotifyTrack[]> {
  const response = await fetchWithTimeout(
    `${SPOTIFY_RECENTLY_PLAYED_URL}?limit=${Math.min(limit * 2, 20)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 204 || response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Spotify recently played failed (${response.status}).`);
  }

  const data = (await response.json()) as SpotifyRecentlyPlayedResponse;

  return dedupeTracks(
    data.items
      .map(mapRecentlyPlayedItem)
      .filter((track): track is SpotifyTrack => track !== null),
    limit,
  );
}

function placeholderArtistsResponse(limit = 4): TopArtistsResponse {
  return {
    artists: PLACEHOLDER_ARTISTS.slice(0, limit),
    source: "placeholder",
  };
}

function mapSpotifyApiArtist(artist: {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  external_urls: { spotify?: string };
}): SpotifyArtist | null {
  const imageUrl = artist.images[0]?.url;

  if (!imageUrl) {
    return null;
  }

  return {
    id: artist.id,
    name: artist.name,
    imageUrl,
    spotifyUrl: artist.external_urls.spotify,
  };
}

async function fetchTopTracks(
  accessToken: string,
  limit = 4,
): Promise<SpotifyTrack[]> {
  const response = await fetchWithTimeout(
    `${SPOTIFY_TOP_TRACKS_URL}?time_range=short_term&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401 || response.status === 403) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Spotify top tracks failed (${response.status}).`);
  }

  const data = (await response.json()) as {
    items: SpotifyRecentlyPlayedItem["track"][];
  };

  return data.items
    .map((track) => mapSpotifyApiTrack(track))
    .filter((track): track is SpotifyTrack => track !== null);
}

async function fetchTopArtists(
  accessToken: string,
  limit = 4,
): Promise<SpotifyArtist[]> {
  const response = await fetchWithTimeout(
    `${SPOTIFY_TOP_ARTISTS_URL}?time_range=short_term&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 401 || response.status === 403) {
    return [];
  }

  if (!response.ok) {
    throw new Error(`Spotify top artists failed (${response.status}).`);
  }

  const data = (await response.json()) as {
    items: Array<{
      id: string;
      name: string;
      images: Array<{ url: string }>;
      external_urls: { spotify?: string };
    }>;
  };

  return data.items
    .map(mapSpotifyApiArtist)
    .filter((artist): artist is SpotifyArtist => artist !== null);
}

async function deriveTopArtistsFromRecentlyPlayed(
  accessToken: string,
  limit = 4,
): Promise<SpotifyArtist[]> {
  const response = await fetchWithTimeout(
    `${SPOTIFY_RECENTLY_PLAYED_URL}?limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (response.status === 204 || response.status === 404) {
    return [];
  }

  if (!response.ok) {
    throw new Error(
      `Spotify recently played artists failed (${response.status}).`,
    );
  }

  const data = (await response.json()) as SpotifyRecentlyPlayedResponse;
  const artistCounts = new Map<
    string,
    { artist: SpotifyArtist; count: number }
  >();

  for (const item of data.items) {
    const albumArtUrl = item.track.album.images[0]?.url;
    if (!albumArtUrl) {
      continue;
    }

    for (const artist of item.track.artists) {
      const existing = artistCounts.get(artist.id);

      if (existing) {
        existing.count += 1;
        continue;
      }

      artistCounts.set(artist.id, {
        count: 1,
        artist: {
          id: artist.id,
          name: artist.name,
          imageUrl: albumArtUrl,
          spotifyUrl: `https://open.spotify.com/artist/${artist.id}`,
        },
      });
    }
  }

  return [...artistCounts.values()]
    .sort((left, right) => right.count - left.count)
    .slice(0, limit)
    .map((entry) => entry.artist);
}

export async function getTopTracksThisMonth(
  limit = 4,
): Promise<TopTracksResponse> {
  if (!isSpotifyConfigured()) {
    return placeholderResponse(limit);
  }

  try {
    const accessToken = await getAccessToken();
    const tracks = await fetchTopTracks(accessToken, limit);

    if (tracks.length === 0) {
      return placeholderResponse(limit);
    }

    return { tracks, source: "spotify" };
  } catch {
    return placeholderResponse(limit);
  }
}

export async function getTopArtistsThisMonth(
  limit = 4,
): Promise<TopArtistsResponse> {
  if (!isSpotifyConfigured()) {
    return placeholderArtistsResponse(limit);
  }

  try {
    const accessToken = await getAccessToken();
    const artists = await fetchTopArtists(accessToken, limit);

    if (artists.length === 0) {
      return placeholderArtistsResponse(limit);
    }

    return { artists, source: "spotify" };
  } catch {
    return placeholderArtistsResponse(limit);
  }
}

export async function getRotationData(): Promise<RotationDataResponse> {
  if (!isSpotifyConfigured()) {
    return {
      tracks: PLACEHOLDER_TRACKS,
      artists: PLACEHOLDER_ARTISTS.slice(0, SPOTIFY_PAGE_ARTIST_LIMIT),
      source: "placeholder",
      tracksPeriod: "month",
      artistsPeriod: "month",
    };
  }

  try {
    const accessToken = await getAccessToken();
    let tracks = await fetchTopTracks(accessToken, 4);
    let artists = await fetchTopArtists(accessToken, SPOTIFY_PAGE_ARTIST_LIMIT);
    let tracksPeriod: RotationDataResponse["tracksPeriod"] = "month";
    let artistsPeriod: RotationDataResponse["artistsPeriod"] = "month";

    if (tracks.length === 0) {
      tracks = await fetchRecentlyPlayedTracks(accessToken, 4);
      tracksPeriod = "recent";
    }

    if (artists.length === 0) {
      artists = await deriveTopArtistsFromRecentlyPlayed(
        accessToken,
        SPOTIFY_PAGE_ARTIST_LIMIT,
      );
      artistsPeriod = "recent";
    }

    if (tracks.length === 0 && artists.length === 0) {
      return {
        tracks: PLACEHOLDER_TRACKS,
        artists: PLACEHOLDER_ARTISTS.slice(0, SPOTIFY_PAGE_ARTIST_LIMIT),
        source: "placeholder",
        tracksPeriod: "month",
        artistsPeriod: "month",
      };
    }

    return {
      tracks: tracks.length > 0 ? tracks : PLACEHOLDER_TRACKS,
      artists: artists.length > 0
        ? artists.slice(0, SPOTIFY_PAGE_ARTIST_LIMIT)
        : PLACEHOLDER_ARTISTS.slice(0, SPOTIFY_PAGE_ARTIST_LIMIT),
      source: "spotify",
      tracksPeriod,
      artistsPeriod,
    };
  } catch {
    return {
      tracks: PLACEHOLDER_TRACKS,
      artists: PLACEHOLDER_ARTISTS.slice(0, SPOTIFY_PAGE_ARTIST_LIMIT),
      source: "placeholder",
      tracksPeriod: "month",
      artistsPeriod: "month",
    };
  }
}

async function fetchCurrentlyPlayingTrack(
  accessToken: string,
): Promise<SpotifyTrack | null> {
  const response = await fetchWithTimeout(SPOTIFY_CURRENTLY_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Spotify currently playing failed (${response.status}).`);
  }

  const data = (await response.json()) as {
    item?: SpotifyRecentlyPlayedItem["track"];
  };

  if (!data.item) {
    return null;
  }

  return mapSpotifyApiTrack(data.item);
}

export function getSpotifyEmbedId(track: SpotifyTrack): string | null {
  if (/^[a-zA-Z0-9]{22}$/.test(track.id)) {
    return track.id;
  }

  if (track.spotifyUrl) {
    const match = track.spotifyUrl.match(/\/track\/([a-zA-Z0-9]+)/);
    return match?.[1] ?? null;
  }

  return null;
}

export function getSpotifyEmbedUrl(track: SpotifyTrack): string | null {
  const trackId = getSpotifyEmbedId(track);

  if (!trackId) {
    return null;
  }

  const params = new URLSearchParams({
    utm_source: "generator",
    theme: "0",
  });

  return `https://open.spotify.com/embed/track/${trackId}?${params.toString()}`;
}

export function getHeroPreviewTrack(tracks?: SpotifyTrack[]): SpotifyTrack {
  return tracks?.[0] ?? PLACEHOLDER_TRACKS[0];
}

export function isSpotifyConfigured(): boolean {
  return getSpotifyCredentials() !== null;
}

export function isSpotifyAppConfigured(): boolean {
  return getSpotifyAppCredentials() !== null;
}

export async function getRecentlyPlayedFromSpotify(
  limit = SPOTIFY_PAGE_TRACK_LIMIT,
): Promise<RecentlyPlayedResponse> {
  if (!isSpotifyConfigured()) {
    return placeholderResponse(limit);
  }

  try {
    const accessToken = await getAccessToken();
    const tracks = await fetchRecentlyPlayedTracks(accessToken, limit);

    if (tracks.length === 0) {
      return placeholderResponse(limit);
    }

    return { tracks, source: "spotify" };
  } catch {
    return placeholderResponse(limit);
  }
}

const getCachedSpotifyTracks = unstable_cache(
  async () => getRecentlyPlayedFromSpotify(SPOTIFY_PAGE_TRACK_LIMIT),
  ["spotify-recently-played"],
  { revalidate: 300, tags: ["spotify-recently-played"] },
);

export const getRecentlyPlayedForPage = cache(
  async (): Promise<RecentlyPlayedResponse> => {
    if (!isSpotifyConfigured()) {
      return placeholderResponse(SPOTIFY_PAGE_TRACK_LIMIT);
    }

    try {
      return await getCachedSpotifyTracks();
    } catch {
      return placeholderResponse(SPOTIFY_PAGE_TRACK_LIMIT);
    }
  },
);

const getCachedHeroRecentlyPlayedTrack = unstable_cache(
  async (): Promise<SpotifyTrack> => {
    if (!isSpotifyConfigured()) {
      return PLACEHOLDER_TRACKS[0];
    }

    try {
      const accessToken = await getAccessToken();
      const tracks = await fetchRecentlyPlayedTracks(accessToken, 1);
      return getHeroPreviewTrack(tracks);
    } catch {
      return PLACEHOLDER_TRACKS[0];
    }
  },
  ["spotify-hero-recently-played"],
  {
    revalidate: HERO_RECENTLY_PLAYED_REVALIDATE_SECONDS,
    tags: ["spotify-hero-recently-played"],
  },
);

export const getHeroRecentlyPlayedTrack = cache(
  async (): Promise<SpotifyTrack> => getCachedHeroRecentlyPlayedTrack(),
);

export async function getRecentlyPlayed(): Promise<RecentlyPlayedResponse> {
  if (typeof window === "undefined") {
    return getRecentlyPlayedFromSpotify();
  }

  try {
    const response = await fetch("/api/spotify/recently-played", {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return { tracks: PLACEHOLDER_TRACKS, source: "placeholder" };
    }

    return (await response.json()) as RecentlyPlayedResponse;
  } catch {
    return { tracks: PLACEHOLDER_TRACKS, source: "placeholder" };
  }
}

const DEFAULT_DEV_BASE_URL = "http://127.0.0.1:3001";

function normalizeSpotifyRedirectUri(uri: string): string {
  return uri
    .replace(/\/$/, "")
    .replace("://localhost:", "://127.0.0.1:")
    .replace("://localhost/", "://127.0.0.1/");
}

export function getSpotifyRedirectUri(origin?: string): string {
  const configured = process.env.SPOTIFY_REDIRECT_URI?.trim();
  if (configured) {
    return normalizeSpotifyRedirectUri(configured);
  }

  if (origin) {
    return `${normalizeSpotifyRedirectUri(origin)}/api/spotify/callback`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_DEV_BASE_URL;
  return `${normalizeSpotifyRedirectUri(baseUrl)}/api/spotify/callback`;
}

export function getSpotifyAuthorizeUrl(state: string, origin?: string): string {
  const credentials = getSpotifyAppCredentials();
  if (!credentials) {
    throw new Error("Spotify app credentials are not configured.");
  }

  const redirectUri = getSpotifyRedirectUri(origin);

  const params = new URLSearchParams({
    client_id: credentials.clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: SPOTIFY_SCOPES.join(" "),
    state,
  });

  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function exchangeSpotifyCode(
  code: string,
  origin?: string,
): Promise<{
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}> {
  const credentials = getSpotifyAppCredentials();
  if (!credentials) {
    throw new Error("Spotify app credentials are not configured.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: getSpotifyRedirectUri(origin),
  });

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${credentials.clientId}:${credentials.clientSecret}`,
      ).toString("base64")}`,
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spotify code exchange failed (${response.status}).`);
  }

  const data = (await response.json()) as SpotifyTokenResponse & {
    refresh_token?: string;
  };

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresIn: data.expires_in,
  };
}
