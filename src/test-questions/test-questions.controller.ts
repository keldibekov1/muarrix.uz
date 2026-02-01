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
import { TestQuestionsService } from './test-questions.service';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';
import { ApiQuery } from '@nestjs/swagger';
import { TelegramJwtGuard } from 'src/guards/TelegramJwtGuard';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('test-questions')
export class TestQuestionsController {
  constructor(private readonly testQuestionsService: TestQuestionsService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createTestQuestionDto: CreateTestQuestionDto) {
    return this.testQuestionsService.create(createTestQuestionDto);
  }

  @UseGuards(AdminJwtGuard)
  @Get()
  @ApiQuery({ name: 'topicId', required: false })
  findAll(@Query('topicId') topicId?: string) {
    return this.testQuestionsService.findAll(topicId);
  }

  @UseGuards(TelegramJwtGuard)
  @Get('app')
  @ApiQuery({ name: 'topicId', required: false })
  tgFiles(@Request() req, @Query('topicId') topicId: string) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.testQuestionsService.getTestQuestionsForTelegramUser(
      telegramUserId,
      topicId,
    );
  }

  @UseGuards(AdminJwtGuard)
  @Get('total')
  getTotalCount() {
    return this.testQuestionsService.getTotalQuestionsCount();
  }

  @UseGuards(AdminJwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testQuestionsService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestQuestionDto: UpdateTestQuestionDto,
  ) {
    return this.testQuestionsService.update(id, updateTestQuestionDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testQuestionsService.remove(id);
  }
}
