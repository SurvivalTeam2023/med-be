import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PlanStatus } from 'src/common/enums/planStatus.enum';


export class SearchPlanDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        enum: PlanStatus,
        required: false,
        default: PlanStatus.ACTIVE,
    })
    @IsOptional()
    status: PlanStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    usageTime: number;
}
export default SearchPlanDTO;
