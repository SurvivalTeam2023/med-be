import { ApiProperty } from '@nestjs/swagger';
export class PublicFile {
  @ApiProperty({ type: 'file', format: 'binary' })
  file: any;
}
