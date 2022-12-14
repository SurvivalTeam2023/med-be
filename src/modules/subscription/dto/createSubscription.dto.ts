/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';

export class CreateSubscriptionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  subcriptionTypeId: number;

  @ApiProperty({ enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

}
export default CreateSubscriptionDTO;
