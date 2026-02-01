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
import { TestSetsService } from './test-sets.service';
import { CreateTestSetDto } from './dto/create-test-set.dto';
import { UpdateTestSetDto } from './dto/update-test-set.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('test-sets')
export class TestSetsController {
  constructor(private readonly testSetsService: TestSetsService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() data: CreateTestSetDto) {
    return this.testSetsService.create(data);
  }

  @Get()
  @ApiQuery({ name: 'subjectId', required: false })
  findAll(@Query('subjectId') subjectId?: string) {
    return this.testSetsService.findAll(subjectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSetsService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSetDto: UpdateTestSetDto) {
    return this.testSetsService.update(id, updateTestSetDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSetsService.remove(id);
  }
}
