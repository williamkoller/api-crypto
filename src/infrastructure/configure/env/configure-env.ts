import { ConfigService } from '@nestjs/config';

export class ConfigureEnv {
  private config: ConfigService = new ConfigService();

  get port(): number {
    return this.config.get<number>('PORT') ?? 3000;
  }

  get pathEnv(): string {
    return this.config.get<string>('PATH_ENV') ?? '.env';
  }

  get host(): string {
    return this.config.get<string>('HOST') ?? 'localhost';
  }

  get urlBinance(): string {
    return this.config.get<string>('URL_BINANCE');
  }

  get redisUrl(): string {
    return this.config.get<string>('REDIS_URL');
  }
  get redisPass(): string {
    return this.config.get<string>('REDIS_PASS');
  }
}
