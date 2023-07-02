import type { RequestHandler, Response } from 'express';

import { redis } from '@/utils/redis-client';

const prefix = 'ratelimit';

export function rateLimitMiddleware(
  maxRequests: number,
  windowSec: number
): RequestHandler {
  return async (req, res, next) => {
    const endpoint = req.path;
    const ip = req.ip || req.headers['x-forwarded-for'] || '';
    const identifier = `${prefix}@${ip}/${endpoint}`;

    const key = `ratelimit:${identifier}`;

    let current = Number(await redis.get(key));
    if (current !== null && Number(current) >= maxRequests) {
      // Too many requests, return an error
      res
        .status(429)
        .set('X-RateLimit-Limit', maxRequests.toString())
        .set('X-RateLimit-Remaining', '0')
        .json({ error: 'Too many requests, please try again later.' });
    } else {
      // Increment the request count and set the key to expire after the windowSec
      current = current === null ? 0 : Number(current);
      const nextCount = current + 1;
      await redis.set(key, nextCount.toString(), 'EX', windowSec);
      res
        .set('X-RateLimit-Limit', maxRequests.toString())
        .set('X-RateLimit-Remaining', (maxRequests - nextCount).toString());
      next();
    }
  };
}

export function getRateLimitInfo(res: Response) {
  const limit = res.get('X-RateLimit-Limit');
  const remaining = res.get('X-RateLimit-Remaining');

  return {
    limit: limit ? Number(limit) : null,
    remaining: remaining ? Number(remaining) : null,
  };
}
