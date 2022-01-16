const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const SAVED_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/tracks`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export type TTrack = {
  addedAt: string;
  artist: string;
  songUrl: string;
  title: string;
  thumb: { url: string; width: number; height: number };
};

async function getAccessToken() {
  const body = new URLSearchParams();
  body.append('grant_type', 'refresh_token');
  body.append('refresh_token', refresh_token as string);

  const data = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  }).then((response) => response.json());

  return data;
}

export async function getTopTracks(): Promise<TTrack[]> {
  const { access_token } = await getAccessToken();

  const { items } = await fetch(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());

  const tracks = items.slice(0, 20).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    thumb: track.album.images[2],
  }));

  return tracks;
}

export async function getSavedTracks(): Promise<TTrack[]> {
  const { access_token } = await getAccessToken();

  const { items } = await fetch(SAVED_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());

  const tracks = items.slice(0, 20).map((track) => ({
    addedAt: track.added_at,
    artist: track.track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.track.external_urls.spotify,
    title: track.track.name,
    thumb: track.track.album.images[2],
  }));

  return tracks;
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
