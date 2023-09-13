import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";

export class UpdateExerciseDTO {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    content: string;


    @ApiProperty({ enum: ExerciseStatus, default: ExerciseStatus.ACTIVE })
    @IsOptional()
    status: ExerciseStatus;

}
export default UpdateExerciseDTO;
