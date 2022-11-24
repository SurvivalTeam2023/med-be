import { ApiProperty } from '@nestjs/swagger';

export class FileQuery {
  @ApiProperty()
  public id?: string;

  @ApiProperty()
  public key?: string;
}
