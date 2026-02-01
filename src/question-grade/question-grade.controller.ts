import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { QuestionGradeService } from './question-grade.service';
import { CreateQuestionGradeDto } from './dto/create-question-grade.dto';
import { UpdateQuestionGradeDto } from './dto/update-question-grade.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('question-grade')
export class QuestionGradeController {
  constructor(private readonly questionGradeService: QuestionGradeService) {}

  @Post()
  create(@Body() createQuestionGradeDto: CreateQuestionGradeDto) {
    return this.questionGradeService.create(createQuestionGradeDto);
  }

  @Get()
  @ApiQuery({ name: 'subjectId', required: false })
  findAll(@Query('subjectId') subjectId?: string) {
    return this.questionGradeService.findAll(subjectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionGradeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionGradeDto: UpdateQuestionGradeDto,
  ) {
    return this.questionGradeService.update(id, updateQuestionGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionGradeService.remove(id);
  }
}
