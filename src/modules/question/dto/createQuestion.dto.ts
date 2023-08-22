import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { QuestionStatus } from "src/common/enums/questionStatus.enum";

export class CreateQuestionDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question: string;

    @ApiProperty({ enum: QuestionStatus, default: QuestionStatus.ACTIVE })
    status: QuestionStatus;

    @ApiProperty({ type: [Number] })
    @IsArray()
    mentalHealthId: number[];


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ageId: number
}
export default CreateQuestionDTO;