import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentcardService } from './paymentcard.service';
import { CreatePaymentcardDto } from './dto/create-paymentcard.dto';
import { UpdatePaymentcardDto } from './dto/update-paymentcard.dto';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@Controller('paymentcards')
export class PaymentcardController {
  constructor(private readonly paymentcardService: PaymentcardService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createPaymentcardDto: CreatePaymentcardDto) {
    return this.paymentcardService.create(createPaymentcardDto);
  }

  @Get()
  findAll() {
    return this.paymentcardService.findAll();
  }
  @Get('active')
  activeCard() {
    return this.paymentcardService.activeCard();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentcardService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentcardDto: UpdatePaymentcardDto,
  ) {
    return this.paymentcardService.update(id, updatePaymentcardDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentcardService.remove(id);
  }
}
