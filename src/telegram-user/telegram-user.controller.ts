import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TelegramUserService } from './telegram-user.service';
import { CreateTelegramUserDto } from './dto/create-telegram-user.dto';
import { UpdateTelegramUserDto } from './dto/update-telegram-user.dto';
import { ApiQuery } from '@nestjs/swagger';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';
import { TelegramJwtGuard } from 'src/guards/TelegramJwtGuard';

@Controller('telegram-users')
export class TelegramUserController {
  constructor(private readonly service: TelegramUserService) {}

  @Post('login')
  login(@Body() dto: CreateTelegramUserDto) {
    return this.service.login(dto);
  }

  @UseGuards(AdminJwtGuard)
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.service.findAll(Number(page) || 1, Number(limit) || 10, search);
  }

  @UseGuards(AdminJwtGuard)
  @Get('total-balance')
  getTotalBalance() {
    return this.service.getTotalBalance();
  }

    @UseGuards(TelegramJwtGuard)
    @Get('/me')
    getMe(@Request() req) {
      return this.service.getMe(req.tgUser.sub);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTelegramUserDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
