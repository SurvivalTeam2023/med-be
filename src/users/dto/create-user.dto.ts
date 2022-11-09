import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, Min, Equals,IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @IsString()
  @ApiProperty() 
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  @Min(6)
  password: String;

  @IsString()
  @ApiProperty()
  @Equals('password')
  repassword: String;

  @IsString()
  @ApiProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  lastname: string;

  @IsString()
  @ApiProperty()
  @Min(12)
  dob: String
}