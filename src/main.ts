import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { EnvironmentVariables } from './config/env.model';
import { ServerConfig } from './config/server.config';
import * as assert from 'assert';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfig = app
    .get<ConfigService<EnvironmentVariables>>(ConfigService)
    .get<ServerConfig>('server');
  assert(!!serverConfig);
  const { port, origin } = serverConfig;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Blog REST API documentation')
    .setVersion('1.0.0')
    .addTag('rokinsky')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin });

  await app.listen(port, () =>
    console.log(`Application is running on port ${port}`),
  );
}
bootstrap();
