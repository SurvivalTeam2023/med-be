import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  IsNumber, IsOptional, IsString } from 'class-validator';
import { SubscriptionTypeStatus } from 'src/common/enums/subscriptionTypeStatus.enum';

export class SearchSubscriptionTypeDTO {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        enum: SubscriptionTypeStatus,
        required: false,
        default: SubscriptionTypeStatus.ACTIVE,
    })
    @IsOptional()
    status: SubscriptionTypeStatus;

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    usageTime: number;
}
export default SearchSubscriptionTypeDTO;
