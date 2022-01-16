import { NextApiRequest, NextApiResponse } from 'next';

import redis from '@/lib/redis';

export default async function handler(req, res) {
  const postSlug = req.query.slug;
  const views = JSON.parse(
    (await redis.hget('post-views', postSlug)) || 'null'
  );

  if (views === null) {
    const firstViews = Math.floor(Math.random() * 101);
    await redis.hset('post-views', postSlug, firstViews);
    res.status(200).json(firstViews);
  } else {
    await redis.hset('post-views', postSlug, views + 1);
    res.status(200).json(views + 1);
  }
}
