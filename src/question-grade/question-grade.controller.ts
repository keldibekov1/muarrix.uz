import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionGradeService } from './question-grade.service';
import { CreateQuestionGradeDto } from './dto/create-question-grade.dto';
import { UpdateQuestionGradeDto } from './dto/update-question-grade.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('question-grade')
export class QuestionGradeController {
  constructor(private readonly questionGradeService: QuestionGradeService) {}

  @UseGuards(AdminJwtGuard)
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

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionGradeDto: UpdateQuestionGradeDto,
  ) {
    return this.questionGradeService.update(id, updateQuestionGradeDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionGradeService.remove(id);
  }
}
