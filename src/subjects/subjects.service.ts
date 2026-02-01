import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateSubjectDto) {
    return this.prisma.subject.create({
      data,
    });
  }

  findAll() {
    return this.prisma.subject.findMany({orderBy:{sortOrder:"asc"}});
  }

  findOne(id: string) {
    const subject = this.prisma.subject.findUnique({
      where: { id },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return this.prisma.subject.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subject = this.prisma.subject.findUnique({
      where: { id },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  remove(id: string) {
    const subject = this.prisma.subject.findUnique({
      where: { id },
    });
    if (!subject) {
      throw new NotFoundException('Subject not found');
    }
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
