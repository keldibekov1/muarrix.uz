import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePaymentcardDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  card_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  card_holder_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(16)
  card_number: string;

  @IsOptional()
  is_active?: boolean;
}
