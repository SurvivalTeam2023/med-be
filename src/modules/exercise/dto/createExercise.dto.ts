import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { ExerciseStatus } from "src/common/enums/exerciseStatus.enum";
import { ExerciseType } from "src/common/enums/exerciseType.enum";

export class CreateExerciseDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;


    @ApiProperty({ enum: ExerciseType })
    @IsString()
    type: ExerciseType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    imageId: string;


    @ApiProperty({ enum: ExerciseStatus, default: ExerciseStatus.ACTIVE })
    status: ExerciseStatus;

}
export default CreateExerciseDTO;
