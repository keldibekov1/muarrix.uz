import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseFileDto } from './create-purchase.dto';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseFileDto) {}