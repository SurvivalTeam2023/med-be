import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber } from "class-validator";
import { ResultStatus } from "src/common/enums/resultStatus.enum";

export class ResultDTO {
    id: number

    questionBankId: number;

    mentalHealth: string[]

    createdAt: Date

}
export default ResultDTO;