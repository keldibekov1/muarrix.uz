import { Module } from '@nestjs/common';
import { FileCategoriesService } from './file_categories.service';
import { FileCategoriesController } from './file_categories.controller';

@Module({
  controllers: [FileCategoriesController],
  providers: [FileCategoriesService],
})
export class FileCategoriesModule {}
