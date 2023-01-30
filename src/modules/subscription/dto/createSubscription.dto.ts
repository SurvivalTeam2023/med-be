/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';
import { CreateDateColumn } from 'typeorm';

export class CreateSubscriptionDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  planId: string;

  @ApiProperty({ enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

  @ApiProperty()
  @CreateDateColumn()
  @IsDateString()
  startDate:Date;

}
export default CreateSubscriptionDTO;
