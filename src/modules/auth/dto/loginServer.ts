import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginServerDTO {
  @IsString()
  @ApiProperty({ description: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'password' })
  public password: string;
}
