import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigureEnv } from '../../configure/env/configure-env';
import { ConfigureModule } from '@/infrastructure/ioc/configure/configure.module';
import { CacheRepository } from '../../cache/repositories/cache-repository';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigureModule],
      inject: [ConfigureEnv],
      useFactory: async (config: ConfigureEnv) => ({
        store: 'redis',
        url: config.redisUrl,
        auth_pass: config.redisPass,
      }),
    }),
  ],
  exports: [CacheModule, CacheRepository],
  providers: [CacheRepository],
})
export class CachedModule {}
