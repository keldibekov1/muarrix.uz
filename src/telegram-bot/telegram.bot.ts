// import { Telegraf } from 'telegraf';
// import { TelegramBotService } from './telegram-bot.service';

// export function createTelegramBot(telegramBotService: TelegramBotService) {
//   const bot = new Telegraf(process.env.BOT_TOKEN!);

//   bot.start(async (ctx) => {
//     await telegramBotService.upsertUserFromStart({
//       id: String(ctx.from.id),
//       first_name: ctx.from.first_name,
//       last_name: ctx.from.last_name,
//       username: ctx.from.username,
//     });

//     const name = ctx.from.first_name ?? 'do‘stim';

//     await ctx.reply(`Salom, ${name}`);
//   });

//   return bot;
// }
