import { HttpService } from '@nestjs/axios';
import { ConfigureEnv } from '../../../../configure/env/configure-env';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { BinanceData } from '../../../../../interfaces/crypto/binance.interface';

@Injectable()
export class Binance {
  private logger = new Logger('Binance');
  private configureEnv: ConfigureEnv = new ConfigureEnv();
  constructor(private readonly http: HttpService) {}

  public async topDay(): Promise<BinanceData[]> {
    try {
      const { data } = await this.http.axiosRef.get<BinanceData[]>(
        `${this.configureEnv.urlBinance}/ticker/24hr`,
      );

      return data;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
}
