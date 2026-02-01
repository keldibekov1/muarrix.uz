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
import { QuestionTopicService } from './question-topic.service';
import { CreateQuestionTopicDto } from './dto/create-question-topic.dto';
import { UpdateQuestionTopicDto } from './dto/update-question-topic.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('question-topic')
export class QuestionTopicController {
  constructor(private readonly questionTopicService: QuestionTopicService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createQuestionTopicDto: CreateQuestionTopicDto) {
    return this.questionTopicService.create(createQuestionTopicDto);
  }

  @Get()
  @ApiQuery({ name: 'gradeId', required: false })
  findAll(@Query('gradeId') gradeId?: string) {
    return this.questionTopicService.findAll(gradeId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionTopicService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionTopicDto: UpdateQuestionTopicDto,
  ) {
    return this.questionTopicService.update(id, updateQuestionTopicDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionTopicService.remove(id);
  }
}
