import { PartialType } from '@nestjs/swagger';
import { CreateQuestionGradeDto } from './create-question-grade.dto';

export class UpdateQuestionGradeDto extends PartialType(CreateQuestionGradeDto) {}
