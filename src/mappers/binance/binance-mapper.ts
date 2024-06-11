import { BinanceData } from '../../interfaces/crypto/binance.interface';

export class BinanceMapper {
  public static mapCrypto(binances: BinanceData[]) {
    return binances.map((crypto) => ({
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
  }
}
