import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePurchaseFileDto,
  CreatePurchaseTestSetDto,
} from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async buyFile(telegramUserId: bigint, data: CreatePurchaseFileDto) {
    const { fileId } = data;

    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');

    const already = await this.prisma.purchase.findUnique({
      where: { telegramUserId_fileId: { telegramUserId, fileId } },
    });
    if (already) return already;

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.telegramUser.findUnique({
        where: { id: telegramUserId },
      });
      if (!user) throw new NotFoundException('Telegram user not found');
      if (user.is_blocked) throw new BadRequestException('User blocked');

      if (user.balance < file.price) {
        throw new BadRequestException('Balans yetarli emas');
      }

      await tx.telegramUser.update({
        where: { id: telegramUserId },
        data: {
          balance: { decrement: file.price },
          purchaseFiles: { increment: 1 },
        },
      });

      const purchase = await tx.purchase.create({
        data: {
          telegramUserId,
          itemType: 'FILE',
          fileId,
          amount: file.price,
        },
      });

      return purchase;
    });
  }

  async buyTestSet(telegramUserId: bigint, data: CreatePurchaseTestSetDto) {
    const { testSetId } = data;

    const testSet = await this.prisma.testSet.findUnique({
      where: { id: testSetId },
    });
    if (!testSet) throw new NotFoundException('TestSet not found');

    const already = await this.prisma.purchase.findUnique({
      where: { telegramUserId_testSetId: { telegramUserId, testSetId } },
    });
    if (already) return already;

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.telegramUser.findUnique({
        where: { id: telegramUserId },
      });
      if (!user) throw new NotFoundException('Telegram user not found');
      if (user.is_blocked) throw new BadRequestException('User blocked');

      if (user.balance < testSet.price) {
        throw new BadRequestException('Balans yetarli emas');
      }

      await tx.telegramUser.update({
        where: { id: telegramUserId },
        data: {
          balance: { decrement: testSet.price },
          purchaseTests: { increment: 1 },
        },
      });

      return tx.purchase.create({
        data: {
          telegramUserId,
          itemType: 'TEST_SET',
          testSetId,
          amount: testSet.price,
        },
      });
    });
  }

  async myPurchasesFile(telegramUserId: bigint) {
    const purchases = await this.prisma.purchase.findMany({
      where: { telegramUserId, itemType: 'FILE' },
      include: {
        file: {
          include: {
            category: true, 
          },
        },
      },
      orderBy: { createdAt: 'desc' }, 
    });

    return purchases.map((purchase) => ({
      id: purchase.id,
      telegramUserId: purchase.telegramUserId,
      itemType: purchase.itemType,
      fileId: purchase.fileId,
      amount: purchase.amount,
      createdAt: purchase.createdAt,
      file: purchase.file
        ? {
            id: purchase.file.id,
            title: purchase.file.title,
            description: purchase.file.description,
            fileUrl: purchase.file.fileUrl,
            isFree: purchase.file.isFree,
            price: purchase.file.price,
            createdAt: purchase.file.createdAt,
            category: purchase.file.category
              ? {
                  id: purchase.file.category.id,
                  name: purchase.file.category.name,
                  sortOrder: purchase.file.category.sortOrder,
                }
              : null,
          }
        : null,
    }));
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prisma.$transaction([
      this.prisma.purchase.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          telegramUser: {
            select: {
              first_name: true,
              last_name: true,
              username: true,
              photo_url: true,
            },
          },
          file: { select: { title: true } },
        },
      }),
      this.prisma.purchase.count(),
    ]);

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getTodaySales() {
    const now = new Date();
    const uzbekTimeOffset = 5 * 60 * 60 * 1000;
    const uzbekNow = new Date(now.getTime() + uzbekTimeOffset);
    uzbekNow.setHours(0, 0, 0, 0);
    const todayUTC = new Date(uzbekNow.getTime() - uzbekTimeOffset);

    const result = await this.prisma.purchase.aggregate({
      where: {
        createdAt: {
          gte: todayUTC,
        },
      },
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    return {
      totalAmount: result._sum.amount || 0,
      totalCount: result._count.id || 0,
    };
  }

  async getTotalSales() {
    const result = await this.prisma.purchase.aggregate({
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });

    return {
      totalAmount: result._sum.amount || 0,
      totalCount: result._count.id || 0,
    };
  }
  async findOne(id: string) {
    return this.prisma.purchase.findUnique({ where: { id } });
  }

  update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: string) {
    return `This action removes a #${id} purchase`;
  }
}
