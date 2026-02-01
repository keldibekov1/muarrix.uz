import { Module } from '@nestjs/common';
import { QuestionGradeService } from './question-grade.service';
import { QuestionGradeController } from './question-grade.controller';

@Module({
  controllers: [QuestionGradeController],
  providers: [QuestionGradeService],
})
export class QuestionGradeModule {}
