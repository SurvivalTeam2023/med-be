/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { SubscriptionStatus } from 'src/common/enums/subscriptionStatus.enum';

export class SearchSubscriptionDTO {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  userId: string;

  @ApiProperty({
    enum: SubscriptionStatus,
    required: false,
    default: SubscriptionStatus.ACTIVE,
  })
  @IsOptional()
  status: SubscriptionStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Type(() => String)
  planId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate: Date;
}
export default SearchSubscriptionDTO;
