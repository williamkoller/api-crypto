import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoadTopCryptoUseCase } from '../../usecases/load-top-crypto/load-top-crypto.usecase';

@ApiTags('api/cryptos')
@Controller('api/cryptos')
export class CryptoController {
  constructor(private readonly loadTopCryptoUseCase: LoadTopCryptoUseCase) {}

  @Get('top')
  public async getTopCryptos() {
    return await this.loadTopCryptoUseCase.execute();
  }
}
