import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { MongoDBConfig } from './config/database/orm.config';
import { EventModule } from './event/event.module';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    EventModule,
    ConfigModule,
    JwtModule,
    TypeOrmModule.forRootAsync(MongoDBConfig),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
