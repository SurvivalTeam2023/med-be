/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionTypeDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  usageTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
export default CreateSubscriptionTypeDTO;
