import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestTopicDto } from './dto/create-test-topic.dto';
import { UpdateTestTopicDto } from './dto/update-test-topic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestTopicsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateTestTopicDto) {
    const testSet = await this.prisma.testSet.findUnique({
      where: { id: data.testSetId },
    });
    if (!testSet) {
      throw new NotFoundException('TestSet not found');
    }
    return this.prisma.testTopic.create({ data });
  }

  async findAll(testSetId?: string) {
    return this.prisma.testTopic.findMany({
      where: { 
        testSetId: testSetId,
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.testTopic.findUnique({ where: { id } });
  }

  async update(id: string, updateTestTopicDto: UpdateTestTopicDto) {
    return this.prisma.testTopic.update({
      where: { id },
      data: updateTestTopicDto,
    });
  }

  async remove(id: string) {
    return this.prisma.testTopic.delete({ where: { id } });
  }
}
