import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_STATUS } from 'src/common/enums/userStatus.enum';

export class UpdateUserDTO {

  @ApiProperty()
  @IsBoolean()
  status: boolean;

}
