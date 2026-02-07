import { IsNumber } from "class-validator";

export class UpdateTelegramUserDto {
  @IsNumber()
  balance: number | undefined;
}
