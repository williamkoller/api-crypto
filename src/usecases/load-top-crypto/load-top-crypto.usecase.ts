import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Binance } from '../../infrastructure/integrations/crypto/http/binance/binance';
import { BinanceMapper } from '../../mappers/binance/binance-mapper';
import { CacheRepository } from '../../infrastructure/cache/repositories/cache-repository';
import { BinanceData } from '../../interfaces/crypto/binance.interface';

type CryptoType = {
  source: string;
  total: number;
  data: BinanceData[];
};

@Injectable()
export class LoadTopCryptoUseCase {
  private logger = new Logger('LoadTopCryptoUseCase');
  private TTLSECONDS = 2000;
  private TTLMINUTES = this.TTLSECONDS * 60;
  constructor(
    private readonly binance: Binance,
    private readonly cacheRepository: CacheRepository,
  ) {}

  public async execute(): Promise<CryptoType> {
    const cacheKey = 'top-cryptos';
    try {
      const cachedData =
        await this.cacheRepository.getCache<CryptoType>(cacheKey);
      if (cachedData) {
        return {
          source: 'cache',
          total: cachedData.total,
          data: cachedData.data,
        };
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

      await this.cacheRepository.setCache(cacheKey, result, this.TTLMINUTES);

      return { source: 'binance', total: result.total, data: result.data };
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }
}
