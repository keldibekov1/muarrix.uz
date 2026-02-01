import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('notifications')
export class NotificationsController {
  constructor(private telegramBotService: TelegramBotService) {}

  @UseGuards(AdminJwtGuard)
  @Post('send')
  async send(
    @Body()
    body: {
      title: string;
      message: string;
      sendToAll: boolean;
      userIds?: string[];
    },
  ) {
    const text = `${body.title}\n\n${body.message}`;

    if (body.sendToAll) {
      await this.telegramBotService.sendToAll(text);
    } else {
      await this.telegramBotService.sendToMany(body.userIds || [], text);
    }

    return { success: true };
  }
}
