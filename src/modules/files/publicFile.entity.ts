import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Express } from 'express';
export class PublicFile {
  @ApiProperty({ type: 'file', format: 'binary' })
  file: any;
}
