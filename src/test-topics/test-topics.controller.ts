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
import { TestTopicsService } from './test-topics.service';
import { CreateTestTopicDto } from './dto/create-test-topic.dto';
import { UpdateTestTopicDto } from './dto/update-test-topic.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('test-topics')
export class TestTopicsController {
  constructor(private readonly testTopicsService: TestTopicsService) {}

  @Post()
  create(@Body() createTestTopicDto: CreateTestTopicDto) {
    return this.testTopicsService.create(createTestTopicDto);
  }

  @Get()
  @ApiQuery({ name: 'testSetId', required: false })
  findAll(@Query('testSetId') testSetId?: string) {
    return this.testTopicsService.findAll(testSetId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testTopicsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestTopicDto: UpdateTestTopicDto,
  ) {
    return this.testTopicsService.update(id, updateTestTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testTopicsService.remove(id);
  }
}
