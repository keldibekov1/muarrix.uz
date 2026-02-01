import { Module } from '@nestjs/common';
import { TestTopicsService } from './test-topics.service';
import { TestTopicsController } from './test-topics.controller';

@Module({
  controllers: [TestTopicsController],
  providers: [TestTopicsService],
})
export class TestTopicsModule {}
