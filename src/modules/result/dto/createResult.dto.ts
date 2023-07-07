import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { ResultStatus } from "src/common/enums/resultStatus.enum";

export class CreateResultDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    questionBankId: number;

    @ApiProperty({ type: Array })
    @IsArray()
    optionId: number[];
}
export default CreateResultDTO;