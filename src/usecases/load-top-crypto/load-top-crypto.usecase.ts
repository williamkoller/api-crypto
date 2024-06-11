import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Binance } from '../../infrastructure/integrations/crypto/http/binance/binance';
import { BinanceData } from '../../interfaces/crypto/binance.interface';
import { BinanceMapper } from '../../mappers/binance/binance-mapper';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LoadTopCryptoUseCase {
  private logger = new Logger('LoadTopCryptoUseCase');
  constructor(
    private readonly binance: Binance,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  public async execute(): Promise<{
    total: number;
    data: BinanceData[];
    source: string;
  }> {
    const cacheKey = 'top-cryptos';
    try {
      const cachedData = await this.cacheManager.get<{
        total: number;
        data: BinanceData[];
      }>(cacheKey);
      if (cachedData) {
        return { source: 'cache', ...cachedData };
      }

      const dataBinance = await this.binance.topDay();

      const shortData = [...dataBinance].sort(
        (a, b) => b.priceChangePercent - a.priceChangePercent,
      );

      const topCryptos = shortData.slice(0, 10);
      const topCryptosInUSD = BinanceMapper.mapCrypto(topCryptos);

      const result = {
        total: topCryptosInUSD.length,
        data: topCryptosInUSD,
      };

      await this.cacheManager.set(cacheKey, result, 5000);

      return { source: 'binance', ...result };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
