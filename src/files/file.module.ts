import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { FilesController } from './file.controller';
import { FilesService } from './files.service';

@Module({
  imports: [],
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
})
export class FilesModules {}
