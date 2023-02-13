import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ResultStatus } from "src/common/enums/resultStatus.enum";

export class CreateResultDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    questionBankId: number;

    @ApiProperty({ enum: ResultStatus, default: ResultStatus.ACTIVE })
    status: ResultStatus;

    @ApiProperty()
    @IsNumber()
    optionId: number;
}
export default CreateResultDTO;