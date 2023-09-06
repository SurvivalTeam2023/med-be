import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, } from "class-validator";

export class ChooseMentalDTO {
    @ApiProperty({ type: [Number] })
    @IsNotEmpty()
    @IsArray()
    mentalHealthId: number[];

}
export default ChooseMentalDTO;
