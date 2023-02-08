import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";
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
}
export default CreateQuestionDTO;