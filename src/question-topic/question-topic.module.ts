import { Module } from '@nestjs/common';
import { QuestionTopicService } from './question-topic.service';
import { QuestionTopicController } from './question-topic.controller';

@Module({
  controllers: [QuestionTopicController],
  providers: [QuestionTopicService],
})
export class QuestionTopicModule {}
