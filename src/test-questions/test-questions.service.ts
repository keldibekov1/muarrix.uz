import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async getTestQuestionsForTelegramUser(
    telegramUserId: bigint,
    topicId: string,
  ) {
    const topic = await this.prisma.testTopic.findUnique({
      where: { id: topicId },
      include: {
        testSet: {
          include: {
            subject: true,
          },
        },
      },
    });

    if (!topic) {
      throw new NotFoundException('Mavzu topilmadi');
    }

    const testSet = topic.testSet;

    if (testSet.isFree || testSet.price === 0) {
      const questions = await this.prisma.testQuestion.findMany({
        where: { topicId },
        orderBy: { createdAt: 'asc' },
      });

      return {
        questions: questions.map((q) => ({
          id: q.id,
          text: q.text,
          imageUrl: q.imageUrl,
          optionA: q.optionA,
          optionB: q.optionB,
          optionC: q.optionC,
          optionD: q.optionD,
          correct: q.correct,
        })),
      };
    }

    const purchase = await this.prisma.purchase.findUnique({
      where: {
        telegramUserId_testSetId: {
          telegramUserId,
          testSetId: testSet.id,
        },
      },
    });

    if (!purchase) {
      throw new ForbiddenException(
        "Bu testni ko'rish uchun avval sotib olishingiz kerak",
      );
    }

    const questions = await this.prisma.testQuestion.findMany({
      where: { topicId },
      orderBy: { createdAt: 'asc' },
    });

    return {
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        imageUrl: q.imageUrl,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correct: q.correct,
      })),
    };
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
