import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import {
  CreatePurchaseFileDto,
  CreatePurchaseTestSetDto,
} from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { TelegramJwtGuard } from 'src/guards/TelegramJwtGuard';
import { ApiQuery } from '@nestjs/swagger';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @UseGuards(TelegramJwtGuard)
  @Post('buy-file')
  buyFile(@Request() req, @Body() createPurchaseDto: CreatePurchaseFileDto) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.purchasesService.buyFile(telegramUserId, createPurchaseDto);
  }

  @UseGuards(TelegramJwtGuard)
  @Post('buy-test-set')
  buyTestSet(@Request() req, @Body() dto: CreatePurchaseTestSetDto) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.purchasesService.buyTestSet(telegramUserId, dto);
  }

  @UseGuards(TelegramJwtGuard)
  @Get('my-file')
  myPurchasesFile(@Request() req) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.purchasesService.myPurchasesFile(telegramUserId);
  }
  @UseGuards(TelegramJwtGuard)
  @Get('my-test')
  myPurchasesTest(@Request() req) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.purchasesService.myPurchasesTests(telegramUserId);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.purchasesService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
    );
  }

  @UseGuards(AdminJwtGuard)
  @Get('today-sales')
  getTodaySales() {
    return this.purchasesService.getTodaySales();
  }

  @UseGuards(AdminJwtGuard)
  @Get('total-sales')
  getTotalSales() {
    return this.purchasesService.getTotalSales();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchasesService.update(id, updatePurchaseDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(id);
  }
}
