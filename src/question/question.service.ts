import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    return await this.prisma.question.create({
      data,
    });
  }

  async findAll(topicId?: string) {
    return this.prisma.question.findMany({
      where: topicId ? { topicId } : undefined,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: { topic: true },
    });

    if (!question) {
      throw new NotFoundException('Savol topilmadi');
    }

    return question;
  }

  async update(id: string, data: UpdateQuestionDto) {
    await this.findOne(id);

    return this.prisma.question.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.question.delete({
      where: { id },
    });
  }
}
