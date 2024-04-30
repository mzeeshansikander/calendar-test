import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT } from '../types';

@Injectable()
export class JwtUserService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAuthToken(payload: JWT) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('app.userSecret'),
      expiresIn: this.configService.get<number>('app.userExpiresIn'),
    });
  }

  async decodeAuthToken(token: string): Promise<JWT> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('app.userSecret'),
    });
  }
}
