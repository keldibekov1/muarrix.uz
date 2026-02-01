import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFileCategoryDto {
    @ApiProperty()
    @IsString()
    name: string;   

    @ApiProperty()
    @IsNumber()
    sortOrder?: number;
}
