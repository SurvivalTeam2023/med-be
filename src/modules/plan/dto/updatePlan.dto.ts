import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlanDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
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
export default UpdatePlanDTO;
