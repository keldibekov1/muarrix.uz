import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';
import { ApiQuery } from '@nestjs/swagger';
import { TelegramJwtGuard } from 'src/guards/TelegramJwtGuard';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createDepositDto: CreateDepositDto) {
    return this.depositService.create(createDepositDto);
  }

  @UseGuards(AdminJwtGuard)
  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.depositService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @UseGuards(AdminJwtGuard)
  @Get('today')
  getTodayDeposits() {
    return this.depositService.getTodayDeposits();
  }

  @UseGuards(TelegramJwtGuard)
  @Get('my')
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getMyDeposits(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.depositService.getMyDeposits(
      telegramUserId,
      Number(page) || 1,
      Number(limit) || 100,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositDto: UpdateDepositDto) {
    return this.depositService.update(id, updateDepositDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositService.remove(id);
  }
}
