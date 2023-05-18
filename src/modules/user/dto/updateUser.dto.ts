import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({ required: false})
  @IsISO8601()
  @IsOptional()
  dob: Date ;

  @ApiProperty({ type: 'string', format: 'binary', required: false, })
  avatar: Express.Multer.File;
}
