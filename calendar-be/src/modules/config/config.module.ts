import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './loaders/app.config';
import databaseConfig from './loaders/database.config';
import { validationSchema } from './schema';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validate: validationSchema.parse,
    }),
  ],
})
export class ConfigModule {}
