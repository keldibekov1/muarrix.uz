import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTelegramUserDto } from './dto/create-telegram-user.dto';
import { UpdateTelegramUserDto } from './dto/update-telegram-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { TelegramBotService } from 'src/telegram-bot/telegram-bot.service';

@Injectable()
export class TelegramUserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private botService: TelegramBotService,
  ) {}

  async login(data: CreateTelegramUserDto) {
    const tgUser = this.verifyTelegramWebApp(data.initData);

    const idBigInt = BigInt(String(tgUser.id));

    const ok = await this.botService.isChannelMember(idBigInt);

    if (!ok) {
      throw new ForbiddenException(
        "Web app’dan foydalanish uchun kanalga a'zo bo'ling",
      );
    }

    const user = await this.prisma.telegramUser.upsert({
      where: { id: idBigInt },
      create: {
        id: idBigInt,
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        photo_url: tgUser.photo_url,
        last_online: new Date(),
      },
      update: {
        first_name: tgUser.first_name,
        last_name: tgUser.last_name,
        username: tgUser.username,
        photo_url: tgUser.photo_url,
        last_online: new Date(),
      },
    });

    if (user.is_blocked) throw new ForbiddenException('User is blocked');

    const access_token = this.jwt.sign(
      {
        sub: user.id.toString(),
        type: 'tg',
        provider: 'telegram',
        aud: 'learnza-web',
        iss: 'learnza-api',
      },
      {
        secret: process.env.JWT_SECRET_USER,
        expiresIn: '1d',
      },
    );

    return {
      access_token,
      user: {
        ...user,
        id: user.id.toString(),
      },
    };
  }

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const skip = (page - 1) * limit;

    const buildWhereCondition = (search?: string) => {
      if (!search) return undefined;

      const conditions: any[] = [
        { first_name: { contains: search, mode: 'insensitive' } },
      ];

      if (search.trim()) {
        conditions.push({
          username: { contains: search, mode: 'insensitive' },
        });
      }

      if (/^\d+$/.test(search)) {
        try {
          conditions.push({ id: BigInt(search) });
        } catch {}
      }

      return { OR: conditions };
    };

    const whereCondition = buildWhereCondition(search);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.telegramUser.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        ...(whereCondition && { where: whereCondition }),
      }),
      this.prisma.telegramUser.count({
        ...(whereCondition && { where: whereCondition }),
      }),
    ]);

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getMe(sub: bigint) {
    const user = await this.prisma.telegramUser.findUnique({
      where: { id: sub },
    });

    if (!user) {
      throw new NotFoundException('User topilmadi');
    }

    return user;
  }

  async getTotalBalance() {
    const result = await this.prisma.telegramUser.aggregate({
      _sum: {
        balance: true,
      },
    });

    return { total: result._sum.balance || 0 };
  }

  async findOne(id: string) {
    const user = await this.prisma.telegramUser.findUnique({
      where: { id: BigInt(id) },
    });
    if (!user) throw new NotFoundException('Telegram user not found');
    return user;
  }

  async update(id: string, data: UpdateTelegramUserDto) {
    await this.findOne(id);

    return this.prisma.telegramUser.update({
      where: { id: BigInt(id) },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.telegramUser.delete({
      where: { id: BigInt(id) },
    });
  }

  private verifyTelegramWebApp(initData: string): any {
    const botToken = process.env.BOT_TOKEN;
    if (!botToken) throw new Error('BOT_TOKEN missing');

    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) throw new ForbiddenException('No hash');

    params.delete('hash');

    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (computedHash !== hash) throw new ForbiddenException('Bad signature');

    const userStr = params.get('user');
    if (!userStr) throw new ForbiddenException('No user');

    return JSON.parse(userStr);
  }
}
