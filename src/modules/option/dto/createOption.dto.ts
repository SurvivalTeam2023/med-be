import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OptionStatus } from "src/common/enums/optionStatus.enum";

export class CreateOptionDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    option: string;

    @ApiProperty({ enum: OptionStatus, default: OptionStatus.ACTIVE })
    status: OptionStatus;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    points: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    questionId: number;
}
export default CreateOptionDTO;