import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, } from 'class-validator';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';

export class UpdateSubscriptionDTO {

    @ApiProperty({ enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
    status: SubscriptionStatus;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    startDate: Date;

    @IsOptional()
    @ApiProperty()
    @IsDateString()
    endDate: Date;


}
export default UpdateSubscriptionDTO;