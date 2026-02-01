import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { File } from 'multer';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async saveFiles(files: File[]) {
    const createdFiles = files.map((f) => ({
      originalName: f.originalname,
      filename: f.filename,
      mimeType: f.mimetype,
      size: f.size,
      path: `/uploads/${f.filename}`,
    }));

    return {
      message: `${createdFiles.length} ta fayl saqlandi`,
      count: createdFiles.length,
      files: createdFiles,
    };
  }
}
