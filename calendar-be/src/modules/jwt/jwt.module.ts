import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtUserService } from './services/jwt-user.service';

@Module({
  imports: [NestJwtModule.register({})],
  providers: [JwtUserService],
  exports: [JwtUserService],
})
export class JwtModule {}
