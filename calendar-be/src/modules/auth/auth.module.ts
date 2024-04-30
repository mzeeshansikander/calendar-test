import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { JwtUserStrategy } from './strategy/user.strategy';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';

@Module({
  imports: [JwtModule, UserModule],
  controllers: [UserAuthController],
  providers: [UserAuthService, JwtUserStrategy],
})
export class AuthModule {}
