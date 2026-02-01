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
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';
import { ApiQuery } from '@nestjs/swagger';
import { TelegramJwtGuard } from 'src/guards/TelegramJwtGuard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @UseGuards(AdminJwtGuard)
  @Get()
  @ApiQuery({ name: 'categoryId', required: false })
  findAll(@Query('categoryId') categoryId?: string) {
    return this.filesService.findAll(categoryId);
  }

  @UseGuards(TelegramJwtGuard)
  @Get('app')
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'search', required: false })
  tgFiles(
    @Request() req,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    const telegramUserId = BigInt(req.tgUser.sub);
    return this.filesService.getFilesForTelegramUser(
      telegramUserId,
      categoryId,
      search,
    );
  }

  @UseGuards(AdminJwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @UseGuards(AdminJwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @UseGuards(AdminJwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
