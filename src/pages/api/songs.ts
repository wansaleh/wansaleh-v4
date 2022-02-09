import fetchSongsDiskograf from '@/lib/fetch-songs-diskograf';

export default async function handler(req, res) {
  const data = await fetchSongsDiskograf(Number(req.query.offset || 0));
  res.status(200).json(data);
}
