import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional } from "class-validator";

export class ChooseMentalDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    mentalHealthId: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    degreeId: number;


}
export default ChooseMentalDTO;
