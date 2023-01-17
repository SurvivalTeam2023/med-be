/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';

export class UpdateSubscriptionDTO {
  @ApiProperty({ enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;
}
export default UpdateSubscriptionDTO;
