import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';

@Injectable()
export class DepositService {
  constructor(
    private prisma: PrismaService,
    private telegramBotService: TelegramBotService,
  ) {}

  async create(data: CreateDepositDto) {
    const user = await this.prisma.telegramUser.findUnique({
      where: { id: data.telegramUserId },
    });

    if (!user) {
      throw new NotFoundException('Telegram user not found');
    }
    return this.prisma.$transaction(async (prisma) => {
      const deposit = await prisma.deposit.create({ data });

      await prisma.telegramUser.update({
        where: { id: data.telegramUserId },
        data: {
          balance: {
            increment: data.amount,
          },
        },
      });

      const text =
        `✅ Balansingiz to'ldirildi!\n\n` +
        `💰 Miqdor: +${data.amount.toLocaleString('uz-UZ')} so'm\n` +
        `Hozirgi balans: ${((user.balance || 0) + data.amount).toLocaleString(
          'uz-UZ',
        )} so'm`;

      this.telegramBotService
        .sendMessage(String(user.id), text)
        .catch(() => {});

      return deposit;
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.deposit.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          telegramUser: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              username: true,
              photo_url: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      this.prisma.deposit.count(),
    ]);

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTodayDeposits() {
    const now = new Date();
    const uzbekTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Tashkent' }),
    );
    uzbekTime.setHours(0, 0, 0, 0);

    const todayUTC = new Date(uzbekTime.getTime() - 5 * 60 * 60 * 1000);

    const result = await this.prisma.deposit.aggregate({
      where: {
        createdAt: {
          gte: todayUTC,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return { total: result._sum.amount || 0 };
  }

  async getMyDeposits(
    telegramUserId: bigint,
    page: number = 1,
    limit: number = 1000,
  ) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.deposit.findMany({
        where: {
          telegramUserId,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.deposit.count({
        where: {
          telegramUserId,
        },
      }),
    ]);

    const totalAmount = await this.prisma.deposit.aggregate({
      where: {
        telegramUserId,
      },
      _sum: {
        amount: true,
      },
    });

    return {
      data,
      total,
      totalAmount: totalAmount._sum.amount || 0,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.prisma.deposit.findUnique({ where: { id } });
  }

  async update(id: string, updateDepositDto: UpdateDepositDto) {
    return this.prisma.deposit.update({
      where: { id },
      data: updateDepositDto,
    });
  }

  async remove(id: string) {
    return this.prisma.deposit.delete({ where: { id } });
  }
}
