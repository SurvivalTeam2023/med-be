import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsDateString, Length, IsOptional } from 'class-validator';
import { GENDER } from 'src/common/enums/userGender.enum';
import { MatchPassword } from 'src/decorator/validate.decorator';

export class CreateArtistDTO {
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
  @MatchPassword(CreateArtistDTO, (s) => s.password)
  repassword: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  lastName: string;


  @ApiProperty()
  @IsOptional()
  bio: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  artist_name: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  dob: Date;
}
