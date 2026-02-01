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
import { TestQuestionsService } from './test-questions.service';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('test-questions')
export class TestQuestionsController {
  constructor(private readonly testQuestionsService: TestQuestionsService) {}

  @Post()
  create(@Body() createTestQuestionDto: CreateTestQuestionDto) {
    return this.testQuestionsService.create(createTestQuestionDto);
  }

  @Get()
  @ApiQuery({ name: 'topicId', required: false })
  findAll(@Query('topicId') topicId?: string) {
    return this.testQuestionsService.findAll(topicId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testQuestionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestQuestionDto: UpdateTestQuestionDto,
  ) {
    return this.testQuestionsService.update(id, updateTestQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testQuestionsService.remove(id);
  }
}
