import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class findExerciseDTO {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsNumber()
    @IsOptional()
    mentalHealthId: number;

}
export default findExerciseDTO;
