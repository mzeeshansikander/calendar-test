import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT } from 'src/modules/jwt/types';
import { User } from 'src/modules/user/entity/user.entity';
import { UserService } from 'src/modules/user/user.service';

type Return = { user: User } | false;
@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwt_user') {
  constructor(
    configService: ConfigService,
    private readonly service: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('app.userSecret'),
      ignoreExpiration: false,
    });
  }
  async validate({ _id }: JWT): Promise<Return> {
    const user = await this.service.findById(_id);
    if (!user) return false;
    return { user };
  }
}
