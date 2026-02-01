import { Module } from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { TelegramUserController } from './telegram-user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [TelegramUserController],
  providers: [TelegramUserService, PrismaService],
})
export class TelegramUserModule {}
