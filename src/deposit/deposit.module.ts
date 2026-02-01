import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { TelegramBotModule } from 'src/telegram-bot/telegram-bot.module';

@Module({
  imports: [TelegramBotModule],
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
