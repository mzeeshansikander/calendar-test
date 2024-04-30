import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { AuthorizationHeader } from './utils/app/types';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  });
  const config = new DocumentBuilder()
    .setTitle('iNERDE')
    .setDescription(
      'iNERDE back-end application written in NestJS using PostgreSQL and TypeORM.',
    )
    .setVersion('1.0.0')
    .addTag('')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      AuthorizationHeader.BEARER,
    )
    .addBasicAuth(
      {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
      AuthorizationHeader.BASIC,
    )
    .build();
  const options = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, options);

  const port = configService.get<number>('app.port');
  await app.listen(port);
  Logger.log(`🚀 Server is up and running on port ${port}`, 'Bootstrap');
}
bootstrap();
