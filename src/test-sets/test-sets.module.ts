import { Module } from '@nestjs/common';
import { TestSetsService } from './test-sets.service';
import { TestSetsController } from './test-sets.controller';

@Module({
  controllers: [TestSetsController],
  providers: [TestSetsService],
})
export class TestSetsModule {}
