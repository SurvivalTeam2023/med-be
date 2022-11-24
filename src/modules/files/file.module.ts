import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileDTO } from './dto/file.dto';

import { FilesController } from './file.controller';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileDTO])],
  controllers: [FilesController],
  providers: [FilesService, ConfigService],
})
export class FilesModules {}
