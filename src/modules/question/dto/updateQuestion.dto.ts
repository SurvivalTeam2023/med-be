import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QuestionStatus } from "src/common/enums/questionStatus.enum";

export class UpdateQuestionDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    question: string;

    @ApiProperty({ enum: QuestionStatus, default: QuestionStatus.ACTIVE })
    @IsOptional()
    status: QuestionStatus;
}
export default UpdateQuestionDTO;