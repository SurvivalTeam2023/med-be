import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Express } from 'express';
export class FileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
  // @ApiProperty({ type: 'string', format: 'binary', required: true })
  // file: Express.Multer.File;
}
