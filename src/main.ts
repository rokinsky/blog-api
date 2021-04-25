import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentVariables } from './config/env.model';
import { ServerConfig } from './config/server.config';
import * as assert from 'assert';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = app
    .get<ConfigService<EnvironmentVariables>>(ConfigService)
    .get<ServerConfig>('server');
  assert(!!serverConfig);
  const { port, origin } = serverConfig;

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin });

  await app.listen(port, () =>
    console.log(`Application is running on port ${port}`),
  );
}
bootstrap();
