import type { NextApiRequest, NextApiResponse } from 'next';

import { getSavedTracks } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      addedAt: string;
      artist: string;
      songUrl: string;
      title: string;
      thumb: { url: string; width: number; height: number };
    }[]
  >
) {
  const tracks = await getSavedTracks();

  res.status(200).json(tracks);
}
