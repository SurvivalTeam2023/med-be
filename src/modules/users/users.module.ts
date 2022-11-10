import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/modules/files/files.service';
import { FileDTO } from '../files/dto/file.dto';
import User from './user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, FileDTO])],
  controllers: [UsersController],
  providers: [UsersService, FilesService, ConfigService],
})
export class UsersModule {}
