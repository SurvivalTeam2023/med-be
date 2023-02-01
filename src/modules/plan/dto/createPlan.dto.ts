import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePlanDTO {
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
export default CreatePlanDTO;
