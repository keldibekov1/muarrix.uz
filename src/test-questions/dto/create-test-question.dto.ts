import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestQuestionDto {
  @ApiProperty()
  @IsString()
  topicId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsString()
  optionA: string;

  @ApiProperty()
  @IsString()
  optionB: string;

  @ApiProperty()
  @IsString()
  optionC: string;

  @ApiProperty()
  @IsString()
  optionD: string;

  @ApiProperty({ enum: ['A', 'B', 'C', 'D'] })
  @IsString()
  correct: 'A' | 'B' | 'C' | 'D';
}
