import fetchSongs from '@/lib/fetch-songs';

export default async function handler(req, res) {
  const data = await fetchSongs(Number(req.query.offset || 0));
  res.status(200).json(data);
}
