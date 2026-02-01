import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionTopicDto {
  @ApiProperty()
  @IsString()
  gradeId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1, default: 1 })
  @IsNumber()
  sortOrder: number;
}
