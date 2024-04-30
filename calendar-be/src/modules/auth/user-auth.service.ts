import { HttpStatus, Injectable } from '@nestjs/common';
import { comparePassword, hashPassword } from 'src/utils/app/hashing/bcrypt';
import { throwHttpException } from 'src/utils/app/http-exception';
import { JwtUserService } from '../jwt/services/jwt-user.service';
import { JWT } from '../jwt/types';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDTO } from './dto/register.dto';

@Injectable()
export class UserAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtUserService,
  ) {}

  async register({ name, email, password: inputPassword }: UserRegisterDTO) {
    const exists = await this.userService.findByEmail(email);
    if (exists)
      throwHttpException('Email is already taken.', HttpStatus.CONFLICT);

    const password = hashPassword(inputPassword);

    await this.userService.register({ name, email, password });
  }

  async login({ email, password }: LoginDTO) {
    const user = await this.userService.findByEmail(email);
    if (!user)
      throwHttpException(
        'User not found. Please sign up first.',
        HttpStatus.NOT_FOUND,
      );

    const isValidPass = comparePassword(password, user.password);
    if (!isValidPass)
      throwHttpException(
        'The email address or password is incorrect.',
        HttpStatus.UNAUTHORIZED,
      );

    return this.generateJWT(user);
  }

  generateJWT(user: User) {
    const payload: JWT = {
      _id: user._id,
      email: user.email,
    };
    const accessToken = this.jwtService.generateAuthToken(payload);
    delete user.password;
    return {
      admin: user,
      accessToken,
    };
  }
}
