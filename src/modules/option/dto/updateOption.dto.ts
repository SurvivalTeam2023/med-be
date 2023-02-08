import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OptionStatus } from "src/common/enums/optionStatus.enum";

export class UpdateOptionDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    answer: string;

    @ApiProperty({ enum: OptionStatus, default: OptionStatus.ACTIVE })
    status: OptionStatus;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    point: number;

}
export default UpdateOptionDTO;