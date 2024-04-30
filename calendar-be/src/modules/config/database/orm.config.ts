import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule } from '../config.module';

export class TypeORMConfig {
  static getMongoSQLConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      url: configService.get<string>('mongo.url'),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}

export const MongoDBConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleAsyncOptions> =>
    TypeORMConfig.getMongoSQLConfig(configService),
  inject: [ConfigService],
};
