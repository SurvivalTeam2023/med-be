import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesController } from './file.controller';
import { FilesService } from './files.service';
import PublicFile from './publicFile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFile])],
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
})
export class FilesModules {}
