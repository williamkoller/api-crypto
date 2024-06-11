import { Module } from '@nestjs/common';
import { ConfigureModule } from '@/infrastructure/ioc/configure/configure.module';
import { HealthCheckModule } from './infrastructure/ioc/health-check/health-check.module';
import { CryptoModule } from './infrastructure/ioc/crypto/crypto.module';

@Module({
  imports: [ConfigureModule, HealthCheckModule, CryptoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
