import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTestSetDto {
  @ApiProperty()
  @IsString()
  subjectId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number;
}
