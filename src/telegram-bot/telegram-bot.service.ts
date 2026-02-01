import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Markup, Telegraf } from 'telegraf';
import { UpsertTelegramUserDto } from './dto/upsert-telegram-user.dto';

@Injectable()
export class TelegramBotService implements OnModuleInit, OnModuleDestroy {
  private bot: Telegraf;

  constructor(private prisma: PrismaService) {}

  onModuleInit() {
    this.bot = new Telegraf(process.env.BOT_TOKEN!);

    this.bot.start(async (ctx) => {
      await this.upsertUserFromStart({
        id: String(ctx.from.id),
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
      });

      const name = ctx.from.first_name ?? 'do‘stim';
      const text =
        `Assalomu alaykum, ${name}!\n\n` +
        `📚 Muarrix.uz ga xush kelibsiz!\n` +
        `Bu yerda siz:\n` +
        `• Testlar yechasiz\n` +
        `• Foydali materiallarni topasiz\n`;

      await ctx.reply(
        text,
        Markup.inlineKeyboard([
          [
            Markup.button.webApp(
              '🚀 Mini App’ni ochish',
              'https://muarrix.uz/app',
            ),
          ],
        ]),
      );
    });

    console.log('Telegram bot ishga tushdi');

    this.bot
      .launch()
      .then(() => console.log('Bot launch OK'))
      .catch((err) => console.error('Bot launch ERROR:', err?.message || err));
  }

  async onModuleDestroy() {
    try {
      await this.bot?.stop();
    } catch {}
  }

  async upsertUserFromStart(data: UpsertTelegramUserDto) {
    const idBigInt = BigInt(data.id);

    return this.prisma.telegramUser.upsert({
      where: { id: idBigInt },
      create: {
        id: idBigInt,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        last_online: new Date(),
      },
      update: {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        last_online: new Date(),
      },
    });
  }

  async sendMessage(userId: string, text: string) {
    try {
      await this.bot.telegram.sendMessage(userId, text);
    } catch (e: any) {
      console.error(`Send error (${userId}):`, e?.message || e);
    }
  }

  async sendToMany(userIds: string[], text: string) {
    for (const id of userIds) {
      await this.sendMessage(id, text);
    }
  }

  async sendToAll(text: string) {
    const users = await this.prisma.telegramUser.findMany({
      where: { is_blocked: false },
      select: { id: true },
    });

    for (const u of users) {
      await this.sendMessage(String(u.id), text);
    }
  }
}
