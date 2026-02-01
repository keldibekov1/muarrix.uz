import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import type { Multer } from 'multer';
import * as path from 'path';
import { v4 as uuid } from 'uuid';
import { UploadService } from './upload.service';
import { UploadValidationPipe } from './upload-validation.pipe';
import { AdminJwtGuard } from 'src/guards/AdminJwtGuard';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(AdminJwtGuard)
  @Post()
  @ApiOperation({ summary: 'Multiple' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Fayllar yuklandi' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: path.join(__dirname, '../../uploads'),
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const fileName = `${uuid()}${ext}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadFiles(
    @UploadedFiles(new UploadValidationPipe()) files: Multer.File[],
  ) {
    return this.uploadService.saveFiles(files);
  }
}
