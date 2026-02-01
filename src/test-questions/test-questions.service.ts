import { Injectable } from '@nestjs/common';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestQuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTestQuestionDto) {
    return this.prisma.testQuestion.create({ data });
  }
  async findAll(topicId?: string) {
    return await this.prisma.testQuestion.findMany({
      where: {
        topicId: topicId ? topicId : undefined,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.testQuestion.findUnique({ where: { id } });
  }

  async update(id: string, updateTestQuestionDto: UpdateTestQuestionDto) {
    return this.prisma.testQuestion.update({
      where: { id },
      data: updateTestQuestionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.testQuestion.delete({ where: { id } });
  }
}
