import Cors from 'cors';

import fetchSongs from '@/lib/fetch-songs';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  const data = await fetchSongs(Number(req.query.offset || 0));

  if (data) {
    res.status(200).json(data);
  }
}
