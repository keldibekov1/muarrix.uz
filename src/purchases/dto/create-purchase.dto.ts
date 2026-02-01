import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePurchaseFileDto {
  @ApiProperty()
  @IsString()
  fileId: string;
}


export class CreatePurchaseTestSetDto {
    @ApiProperty()
    @IsString()
    testSetId: string;
}