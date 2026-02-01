import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTelegramUserDto {
  @IsString()
  @IsNotEmpty()
  initData: string;
}
