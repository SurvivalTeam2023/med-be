import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class findExerciseDTO {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    mentalHealthId: number;

}
export default findExerciseDTO;
