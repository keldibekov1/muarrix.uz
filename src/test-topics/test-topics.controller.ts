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
  Request,
} from '@nestjs/common';
import { TestTopicsService } from './test-topics.service';
import { CreateTestTopicDto } from './dto/create-test-topic.dto';
import { UpdateTestTopicDto } from './dto/update-test-topic.dto';
import { ApiQuery } from '@nestjs/swagger';
import { TelegramJwtGuard } from 'src/guards/TelegramJwtGuard';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('test-topics')
export class TestTopicsController {
  constructor(private readonly testTopicsService: TestTopicsService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createTestTopicDto: CreateTestTopicDto) {
    return this.testTopicsService.create(createTestTopicDto);
  }

  @UseGuards(AdminJwtGuard)
  @Get()
  @ApiQuery({ name: 'testSetId', required: false })
  findAll(@Query('testSetId') testSetId?: string) {
    return this.testTopicsService.findAll(testSetId);
  }

  @UseGuards(TelegramJwtGuard)
  @Get('app')
  @ApiQuery({ name: 'testSetId', required: false })
  tgFiles(@Request() req, @Query('testSetId') testSetId: string) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.testTopicsService.getTestTopicForTelegramUser(
      telegramUserId,
      testSetId,
    );
  }

  @UseGuards(AdminJwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testTopicsService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestTopicDto: UpdateTestTopicDto,
  ) {
    return this.testTopicsService.update(id, updateTestTopicDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testTopicsService.remove(id);
  }
}
