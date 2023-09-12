import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateMentalHealthExerciseDTO {

    @ApiProperty({ type: [Number] })
    @IsArray()
    exerciseId: number[];

}
export default UpdateMentalHealthExerciseDTO;