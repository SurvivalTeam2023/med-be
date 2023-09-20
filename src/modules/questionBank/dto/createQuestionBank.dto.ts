import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateQuestionBankDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    mentalHealthId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(10)
    noQuestion: number;
}
export default CreateQuestionBankDto;