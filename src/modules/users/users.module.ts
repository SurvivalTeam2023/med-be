import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/modules/files/files.service';
import { FilesModules } from '../files/file.module';
import PublicFile from '../files/publicFile.entity';
import User from './user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, PublicFile])],
  controllers: [UsersController],
  providers: [UsersService, FilesService, ConfigService],
})
export class UsersModule {}
