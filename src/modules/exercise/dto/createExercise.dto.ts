import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";

export class CreateExerciseDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;


    @ApiProperty({ enum: ExerciseStatus, default: ExerciseStatus.ACTIVE })
    status: ExerciseStatus;

}
export default CreateExerciseDTO;
