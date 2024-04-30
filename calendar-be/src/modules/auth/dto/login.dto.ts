import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ToLowerCase } from 'src/decorators/transformer/lower.decorator';
import { Trim } from 'src/decorators/transformer/trim.decorator';

export class LoginDTO {
  @ApiProperty({
    description: 'Email of the therapist',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  @ToLowerCase()
  email: string;

  @ApiProperty({
    description: 'Password of the therapist',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @Trim()
  password: string;
}
