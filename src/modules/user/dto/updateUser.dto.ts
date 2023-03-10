import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { USER_STATUS } from 'src/common/enums/userStatus.enum';

export class UpdateUserDTO {
  @IsString()
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({
    message: 'Username can not be empty!',
  })
  username: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ enum: USER_STATUS })
  @IsNotEmpty()
  @IsEnum(USER_STATUS)
  status: USER_STATUS;

}
