import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentcardDto } from './dto/create-paymentcard.dto';
import { UpdatePaymentcardDto } from './dto/update-paymentcard.dto';

@Injectable()
export class PaymentcardService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePaymentcardDto) {
    const count = await this.prisma.paymentCard.count();

    return this.prisma.paymentCard.create({
      data: {
        ...data,
        is_active: count === 0,
      },
    });
  }

  async findAll() {
    return await this.prisma.paymentCard.findMany({ orderBy: { is_active: 'desc' } });
  }

  async activeCard() {
    return await this.prisma.paymentCard.findFirst({
      where: { is_active: true },
    });
  }

  async findOne(id: string) {
    const card = await this.prisma.paymentCard.findFirst({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return card;
  }

  async update(id: string, data: UpdatePaymentcardDto) {
    const card = await this.prisma.paymentCard.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (data.is_active === true) {
      return this.prisma.$transaction(async (tx) => {
        await tx.paymentCard.updateMany({
          data: { is_active: false },
        });

        return tx.paymentCard.update({
          where: { id },
          data: { ...data, is_active: true },
        });
      });
    }

    return this.prisma.paymentCard.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const card = await this.prisma.paymentCard.findUnique({
      where: { id },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }
    if (card.is_active) {
      throw new BadRequestException("Active cardni o'chirib bo'lmaydi");
    }

    return this.prisma.paymentCard.delete({ where: { id } });
  }
}
