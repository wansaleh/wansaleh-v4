import type { NextApiRequest, NextApiResponse } from 'next';

import { getTopTracks } from '@/lib/spotify';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    {
      artist: string;
      songUrl: string;
      title: string;
      thumb: { url: string; width: number; height: number };
    }[]
  >
) {
  const tracks = await getTopTracks();

  res.status(200).json(tracks);
}
