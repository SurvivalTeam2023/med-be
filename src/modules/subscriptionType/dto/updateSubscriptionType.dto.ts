/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSubscriptionTypeDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  usageTime: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  cost: number;
}
export default UpdateSubscriptionTypeDTO;
