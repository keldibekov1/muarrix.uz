import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionGradeDto } from './dto/create-question-grade.dto';
import { UpdateQuestionGradeDto } from './dto/update-question-grade.dto';

@Injectable()
export class QuestionGradeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateQuestionGradeDto) {
    return this.prisma.questionGrade.create({
      data,
    });
  }

  async findAll(subjectId?: string) {
    return this.prisma.questionGrade.findMany({
      where: subjectId ? { subjectId } : undefined,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const grade = await this.prisma.questionGrade.findUnique({
      where: { id },
      include: {
        topics: true,
      },
    });

    if (!grade) {
      throw new NotFoundException('QuestionGrade nor found');
    }

    return grade;
  }

  async update(id: string, dto: UpdateQuestionGradeDto) {
    await this.findOne(id);

    return this.prisma.questionGrade.update({
      where: { id },
      data: {
        name: dto.name,
        sortOrder: dto.sortOrder,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.questionGrade.delete({
      where: { id },
    });
  }
}
