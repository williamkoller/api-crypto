import { Module } from '@nestjs/common';
import { CryptoController } from '@/controllers/crypto/crypto.controller';
import { Binance } from '../../integrations/crypto/http/binance/binance';
import { LoadTopCryptoUseCase } from '../../../usecases/load-top-crypto/load-top-crypto.usecase';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [Binance, LoadTopCryptoUseCase],
  controllers: [CryptoController],
})
export class CryptoModule {}
