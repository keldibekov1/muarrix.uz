import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

import { PaymentcardModule } from './paymentcard/paymentcard.module';
import { TelegramUserModule } from './telegram-user/telegram-user.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { SubjectsModule } from './subjects/subjects.module';
import { FileCategoriesModule } from './file_categories/file_categories.module';
import { FilesModule } from './files/files.module';
import { PurchasesModule } from './purchases/purchases.module';
import { DepositModule } from './deposit/deposit.module';
import { NotificationsController } from './notifications/notifications.controller';
import { TestSetsModule } from './test-sets/test-sets.module';
import { TestTopicsModule } from './test-topics/test-topics.module';
import { TestQuestionsModule } from './test-questions/test-questions.module';
import { QuestionGradeModule } from './question-grade/question-grade.module';
import { QuestionTopicModule } from './question-topic/question-topic.module';
import { QuestionModule } from './question/question.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaymentcardModule,
    TelegramUserModule,
    TelegramBotModule,
    SubjectsModule,
    FileCategoriesModule,
    FilesModule,
    PurchasesModule,
    DepositModule,
    TestSetsModule,
    TestTopicsModule,
    TestQuestionsModule,
    QuestionGradeModule,
    QuestionTopicModule,
    QuestionModule,
    UploadModule,
  ],
  controllers: [AppController, NotificationsController],
  providers: [AppService],
})
export class AppModule {}
