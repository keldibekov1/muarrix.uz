import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFileDto {
  @ApiProperty()
  @IsOptional()
  categoryId?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fileUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price?: number;
}
