import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestSetDto } from './dto/create-test-set.dto';
import { UpdateTestSetDto } from './dto/update-test-set.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestSetsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTestSetDto) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: data.subjectId },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return await this.prisma.testSet.create({
      data,
    });
  }

  async findAll(subjectId?: string) {
    return await this.prisma.testSet.findMany({
      where: {
        subjectId: subjectId ? subjectId : undefined,
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getTestSetsForTelegramUser(telegramUserId: bigint, subjectId?: string) {
    const testSets = await this.prisma.testSet.findMany({
      where: subjectId ? { subjectId } : undefined,
      include: {
        subject: true,
        purchases: {
          where: { telegramUserId },
          select: { id: true },
        },
        topics: {
          select: {
            id: true,
            _count: {
              select: { questions: true },
            },
          },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return testSets.map((testSet) => {
      const purchased =
        testSet.isFree || testSet.price === 0 || testSet.purchases.length > 0;

      return {
        id: testSet.id,
        title: testSet.title,
        sortOrder: testSet.sortOrder,
        price: testSet.price,
        isFree: testSet.isFree,
        createdAt: testSet.createdAt,
        subject: testSet.subject,
        purchased,
      };
    });
  }

  async findOne(id: string) {
    return await this.prisma.testSet.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTestSetDto: UpdateTestSetDto) {
    return await this.prisma.testSet.update({
      where: { id },
      data: updateTestSetDto,
    });
  }

  async remove(id: string) {
    const existingTestSet = await this.findOne(id);
    if (!existingTestSet) {
      throw new NotFoundException('Test set not found');
    }
    return await this.prisma.testSet.delete({
      where: { id },
    });
  }
}
