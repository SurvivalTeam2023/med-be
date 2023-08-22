import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsDateString, Length, IsOptional, Matches, } from 'class-validator';
import { GENDER } from 'src/common/enums/userGender.enum';
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
  @IsOptional()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'First name must not contain special characters' })
  firstName: string;

  @IsString()
  @Is
  @ApiProperty()
  @Matches(/^[a-zA-Z\s]*$/, { message: 'Last name must not contain special characters' })
  @IsOptional()
  lastName: string;

  @ApiProperty({ enum: GENDER })
  @IsOptional()
  gender: GENDER;

  @IsString()
  @ApiProperty()
  @IsOptional()
  city: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty({ type: Date, nullable: true })
  @IsDateString()
  @IsOptional()
  dob?: Date;
}
