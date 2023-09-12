import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateExerciseDTO {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    content: string;

}
export default UpdateExerciseDTO;
