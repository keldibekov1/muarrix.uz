import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionTopicDto } from './dto/create-question-topic.dto';
import { UpdateQuestionTopicDto } from './dto/update-question-topic.dto';

@Injectable()
export class QuestionTopicService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateQuestionTopicDto) {
    return this.prisma.questionTopic.create({
      data,
    });
  }

  async findAll(gradeId?: string) {
    return this.prisma.questionTopic.findMany({
      where: gradeId ? { gradeId } : undefined,
      orderBy: { sortOrder: 'asc' },
      include: {
        questions: true,
      },
    });
  }

  async findOne(id: string) {
    const topic = await this.prisma.questionTopic.findUnique({
      where: { id },
      include: {
        questions: true,
        grade: true,
      },
    });

    if (!topic) throw new NotFoundException('QuestionTopic not found');
    return topic;
  }

  async update(id: string, dto: UpdateQuestionTopicDto) {
    await this.findOne(id);

    return this.prisma.questionTopic.update({
      where: { id },
      data: {
        name: dto.name,
        sortOrder: dto.sortOrder,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.questionTopic.delete({
      where: { id },
    });
  }
}
