import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { OptionStatus } from "src/common/enums/optionStatus.enum";

export class SearchOptionDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    option: string;

    @ApiProperty({ enum: OptionStatus, default: OptionStatus.ACTIVE, required: false })
    @IsOptional()
    status: OptionStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    questionId: number;
}
export default SearchOptionDTO;