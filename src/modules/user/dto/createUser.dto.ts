import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsDateString, Length } from 'class-validator';
import { GENDER } from 'src/common/enums/user-gender.enum';
import { MatchPassword } from 'src/decorator/validate.decorator';

export class CreateUserDTO {
  @IsString()
  @ApiProperty()
  @IsNotEmpty({
    message: 'Username can not be empty!',
  })
  username: string;

  @ApiProperty()
  @IsEmail({
    message: 'Incorrect email!',
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Password can not be empty!',
  })
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

  @ApiProperty({ enum: GENDER })
  gender: GENDER;  

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  address: string;

  @ApiProperty()
  @IsDateString()
  dob: Date;
}
