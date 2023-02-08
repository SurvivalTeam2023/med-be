import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QuestionStatus } from "src/common/enums/questionStatus.enum";

export class SearchQuestionDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    question: string;
  
    @ApiProperty({
      enum: QuestionStatus,
      required: false,
      default: QuestionStatus.ACTIVE,
    })
    @IsOptional()
    status: QuestionStatus;
  }
  export default SearchQuestionDTO;