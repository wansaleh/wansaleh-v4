import redis from '@/lib/redis';

export default async function handler(req, res) {
  const postSlug = req.query.slug;
  const views = JSON.parse(await redis.hget('post-views', postSlug));

  if (views === null) {
    await redis.hset('post-views', postSlug, 0);
    res.status(200).json(0);
  } else {
    await redis.hset('post-views', postSlug, views + 1);
    res.status(200).json(views + 1);
  }
}
