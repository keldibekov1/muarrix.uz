import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateDepositDto {
  @ApiProperty()
  @IsNumber()
  telegramUserId: bigint;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
