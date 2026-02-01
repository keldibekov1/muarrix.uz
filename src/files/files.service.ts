import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFileDto) {
    return await this.prisma.file.create({
      data,
    });
  }

  async findAll(categoryId?: string) {
    return await this.prisma.file.findMany({
      include: { category: true },
      omit: { fileUrl: true },
      orderBy: { createdAt: 'desc' },
      where: categoryId ? { categoryId } : undefined,
    });
  }

  async getFilesForTelegramUser(
    telegramUserId: bigint,
    categoryId?: string,
    search?: string,
  ) {
    const whereCondition: any = {};

    if (categoryId) {
      whereCondition.categoryId = categoryId;
    }

    if (search && search.trim()) {
      whereCondition.title = {
        contains: search.trim(),
        mode: 'insensitive',
      };
    }

    const files = await this.prisma.file.findMany({
      where: whereCondition,
      include: {
        category: true,
        purchases: {
          where: { telegramUserId },
          select: { id: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return files.map((file) => {
      const purchased =
        file.isFree || file.price === 0 || file.purchases.length > 0;

      return {
        id: file.id,
        title: file.title,
        description: file.description,
        price: file.price,
        isFree: file.isFree,
        downloadCount: file.downloadCount,
        createdAt: file.createdAt,
        category: file.category,
        purchased,
        fileUrl: purchased ? file.fileUrl : null,
      };
    });
  }

  async findOne(id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
      omit: { fileUrl: true },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new NotFoundException('File not found');
    }

    return await this.prisma.file.update({
      where: { id },
      data: updateFileDto,
    });
  }

  async remove(id: string) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return await this.prisma.file.delete({ where: { id } });
  }
}
