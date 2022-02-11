import Cors from 'cors';

import initMiddleware from '@/lib/init-middleware';
import redis from '@/lib/redis';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: ['http://localhost:3000', /\.wansaleh\.com$/],
    methods: ['GET', 'POST'],
  })
);

export default async function handler(req, res) {
  await cors(req, res);

  const action = req.query.action || req.body.action;
  const postSlug = req.query.slug || req.body.slug;

  const views = JSON.parse(
    (await redis.hget('post-views', postSlug)) || 'null'
  );

  if (req.method === 'POST' && action === 'increment') {
    redis.hset('post-views', postSlug, views + 1);
    res.status(200).json(views + 1);
  }

  if (req.method === 'GET') {
    if (views === null) {
      const firstViews = Math.floor(Math.random() * 101);
      await redis.hset('post-views', postSlug, firstViews);
      res.status(200).json(firstViews);
    } else {
      res.status(200).json(views);
    }
  }
}
