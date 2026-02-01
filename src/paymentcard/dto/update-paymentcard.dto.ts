import { PartialType } from '@nestjs/swagger';
import { CreatePaymentcardDto } from './create-paymentcard.dto';

export class UpdatePaymentcardDto extends PartialType(CreatePaymentcardDto) {}
