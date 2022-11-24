import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsDate } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @ApiProperty()
  // @Equals(`${this.password}`)
  repassword: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  // @IsNumber()
  @ApiProperty()
  @IsDate()
  dob: Date;
}
