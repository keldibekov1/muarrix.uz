import { Module } from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { TelegramUserController } from './telegram-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';

@Module({
  imports: [TelegramBotModule],
  controllers: [TelegramUserController],
  providers: [TelegramUserService, PrismaService],

})
export class TelegramUserModule {}
