import { Injectable } from '@nestjs/common';
import { Binance } from '../../infrastructure/integrations/crypto/http/binance/binance';
import { BinanceData } from '../../interfaces/crypto/binance.interface';

@Injectable()
export class LoadTopCryptoUseCase {
  constructor(private readonly binance: Binance) {}

  public async execute(): Promise<{ total: number; data: BinanceData[] }> {
    const dataBinance = await this.binance.topDay();

    const shortData = [...dataBinance].sort(
      (a, b) => b.priceChangePercent - a.priceChangePercent,
    );

    const topCryptos = shortData.slice(0, 10);
    const topCryptosInUSD = topCryptos.map((crypto: BinanceData) => ({
      symbol: crypto.symbol,
      priceChange: Number(crypto.priceChange),
      priceChangePercent: Number(crypto.priceChangePercent),
      weightedAvgPrice: Number(crypto.weightedAvgPrice),
      prevClosePrice: Number(crypto.prevClosePrice),
      lastPrice: Number(crypto.lastPrice),
      lastQty: Number(crypto.lastQty),
      bidPrice: Number(crypto.bidPrice),
      bidQty: Number(crypto.bidQty),
      askPrice: Number(crypto.askPrice),
      askQty: Number(crypto.askQty),
      openPrice: Number(crypto.openPrice),
      highPrice: Number(crypto.highPrice),
      lowPrice: Number(crypto.lowPrice),
      volume: Number(crypto.volume),
      quoteVolume: Number(crypto.quoteVolume),
      openTime: Number(crypto.openTime),
      closeTime: Number(crypto.closeTime),
      firstId: Number(crypto.firstId),
      lastId: Number(crypto.lastId),
      count: Number(crypto.count),
      priceInUSD: Number(crypto.lastPrice),
    }));

    return {
      total: topCryptosInUSD.length,
      data: topCryptosInUSD,
    };
  }
}
