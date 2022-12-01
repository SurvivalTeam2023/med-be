import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsDateString, Length } from 'class-validator';
import { MatchPassword } from 'src/decorator/validate.decorator';

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
  @Length(6)
  password: string;

  @IsString()
  @ApiProperty()
  @MatchPassword(CreateUserDTO, (s) => s.password)
  repassword: string;

  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  dob: Date;
}
