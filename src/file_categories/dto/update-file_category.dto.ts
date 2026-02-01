import { PartialType } from '@nestjs/swagger';
import { CreateFileCategoryDto } from './create-file_category.dto';

export class UpdateFileCategoryDto extends PartialType(CreateFileCategoryDto) {}
