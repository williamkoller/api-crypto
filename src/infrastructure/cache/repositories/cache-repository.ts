import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async clearCache(keyName: string): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys();

    keys.forEach((key) => {
      if (key.startsWith(keyName)) {
        this.cacheManager.del(key);
      }
    });
  }

  async setCache<T>(name: string, payload: T, ttl: number): Promise<void> {
    await this.cacheManager.set(name, payload, ttl);
  }

  async getCache<T>(name: string): Promise<T> {
    return await this.cacheManager.get(name);
  }
}
