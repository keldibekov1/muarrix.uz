import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FileCategoriesService } from './file_categories.service';
import { CreateFileCategoryDto } from './dto/create-file_category.dto';
import { UpdateFileCategoryDto } from './dto/update-file_category.dto';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('file-categories')
export class FileCategoriesController {
  constructor(private readonly fileCategoriesService: FileCategoriesService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createFileCategoryDto: CreateFileCategoryDto) {
    return this.fileCategoriesService.create(createFileCategoryDto);
  }

  @Get()
  findAll() {
    return this.fileCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileCategoriesService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileCategoryDto: UpdateFileCategoryDto) {
    return this.fileCategoriesService.update(id, updateFileCategoryDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileCategoriesService.remove(id);
  }
}
