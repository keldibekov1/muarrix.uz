import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TelegramBotService, PrismaService],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
