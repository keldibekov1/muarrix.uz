import { Module } from '@nestjs/common';
import { PaymentcardService } from './paymentcard.service';
import { PaymentcardController } from './paymentcard.controller';

@Module({
  controllers: [PaymentcardController],
  providers: [PaymentcardService],
})
export class PaymentcardModule {}
