/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
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
  usageTime: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cost: number;
}
export default UpdateSubscriptionTypeDTO;
