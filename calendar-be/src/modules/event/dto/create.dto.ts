import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Trim } from 'src/decorators/transformer/trim.decorator';

export class EventCreateDTO {
  @ApiProperty({
    description: 'Description of the event',
    example: 'This is an event',
  })
  @IsNotEmpty()
  @IsString()
  @Trim()
  description: string;

  @ApiProperty({
    description: 'Price of the event',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Date of the event',
    example: new Date().toISOString(),
  })
  @IsNotEmpty()
  @IsDateString()
  at: Date;
}
