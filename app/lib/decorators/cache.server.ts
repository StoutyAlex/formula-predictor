import { redisClient } from '~/redis/config.server';

async function getCachedValue<T>(key: string) {
  const cachedData = await redisClient.get(key);
  return cachedData ? (JSON.parse(cachedData) as T) : null;
}

async function setCachedValue(key: string, value: any) {
  await redisClient.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24); // Cache for 1 day
}

async function invalidateCache(key: string) {
  await redisClient.del(key);
  console.log(`Cache invalidated for key: ${key}`);
}

export const Cache = {
  get: getCachedValue,
  set: setCachedValue,
  del: invalidateCache,
};
