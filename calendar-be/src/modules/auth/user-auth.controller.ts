import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/utils/app/pipes/validation.pipe';
import { User } from '../user/entity/user.entity';
import { LoginDTO } from './dto/login.dto';
import { UserRegisterDTO } from './dto/register.dto';
import { UserAuthService } from './user-auth.service';

@ApiTags('User Authentication')
@Controller('/auth/user')
export class UserAuthController {
  constructor(private userService: UserAuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User has been successfully registered.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists.',
  })
  @ApiBody({ type: UserRegisterDTO })
  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: UserRegisterDTO) {
    return await this.userService.register(data);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully logged in.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation failed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'The email address or password is incorrect.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.',
  })
  @ApiBody({ type: LoginDTO })
  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDTO) {
    return await this.userService.login(data);
  }
}
