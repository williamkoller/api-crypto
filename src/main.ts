import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigureEnv } from './infrastructure/configure/env/configure-env';
import { Logger } from '@nestjs/common';
import { Swagger } from './infrastructure/swagger/swagger';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  Swagger.setup(app);

  const port = new ConfigureEnv().port;
  const host = new ConfigureEnv().host;

  await app.listen(port, () =>
    logger.log(`Server is running on http://${host}:${port}/swagger`),
  );
}
bootstrap();
