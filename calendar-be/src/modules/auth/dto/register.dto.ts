import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ToLowerCase } from 'src/decorators/transformer/lower.decorator';
import { Trim } from 'src/decorators/transformer/trim.decorator';

export class UserRegisterDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  @Trim()
  name: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'The email of the therapist',
  })
  @IsNotEmpty()
  @IsEmail()
  @ToLowerCase()
  @Trim()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the therapist',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Trim()
  password: string;
}
