import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { Trim } from 'src/decorators/transformer/trim.decorator';

export class EventUpdateDTO {
  @ApiProperty({
    description: 'Description of the event',
    example: 'This is an event',
  })
  @IsOptional()
  @IsString()
  @Trim()
  description: string;

  @ApiProperty({
    description: 'Price of the event',
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Date of the event',
    example: new Date().toISOString(),
  })
  @IsOptional()
  @IsDateString()
  at: Date;
}
