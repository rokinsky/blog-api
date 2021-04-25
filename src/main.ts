import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('global.port', 5000);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hello')
    .setDescription('Blog REST API documentation')
    .setVersion('1.0.0')
    .addTag('rokinsky')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () =>
    console.log(`Application is running on port ${port}`),
  );
}
bootstrap();
