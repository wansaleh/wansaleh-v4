import type { NextApiRequest, NextApiResponse } from 'next';

import { getNowPlaying } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    isPlaying: boolean;
    album?: string;
    albumImageUrl?: string;
    artist?: string;
    songUrl?: string;
    title?: string;
  }>
) {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    res.status(200).json({ isPlaying: false });
    return;
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  res.status(200).json({
    isPlaying,
    album,
    albumImageUrl,
    artist,
    songUrl,
    title,
  });
}
