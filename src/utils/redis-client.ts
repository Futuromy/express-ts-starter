import Redis from 'ioredis';

import { Env } from '@/utils/Env';

// Initialize your Redis client
const redis = new Redis(Env.getValue('UPSTASH_REDIS_REST_URL'));

// Export your Redis client
export { redis };
