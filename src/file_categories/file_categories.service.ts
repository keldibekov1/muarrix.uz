import { Injectable } from '@nestjs/common';
import { CreateFileCategoryDto } from './dto/create-file_category.dto';
import { UpdateFileCategoryDto } from './dto/update-file_category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileCategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFileCategoryDto) {
    return await this.prisma.fileCategory.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.fileCategory.findMany({orderBy:{sortOrder:"asc"}});
  }

  async findOne(id: string) {
    const category = await this.prisma.fileCategory.findUnique({ where: { id } });
    if (!category) {
      throw new Error('File Category not found');
    }
    return await this.prisma.fileCategory.findUnique({ where: { id } });
  }

  async update(id: string, updateFileCategoryDto: UpdateFileCategoryDto) {
    const category = await this.prisma.fileCategory.findUnique({ where: { id } });
    if (!category) {
      throw new Error('File Category not found');
    }
    return await this.prisma.fileCategory.update({
      where: { id },
      data: updateFileCategoryDto,
    });
  }

  async remove(id: string) {
    const category = await this.prisma.fileCategory.findUnique({ where: { id } });
    if (!category) {
      throw new Error('File Category not found');
    }
    return await this.prisma.fileCategory.delete({ where: { id } });
  }
}
