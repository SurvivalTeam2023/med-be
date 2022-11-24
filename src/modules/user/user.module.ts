import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from 'src/modules/files/files.service';
import User from './entities/user.entity';
import { UserController } from './user.controller';
import { KeycloakModule } from '../../common/config/keycloak.config';
import { File } from '../files/entities/file.entity';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [TypeOrmModule.forFeature([User, File]), KeycloakModule, HttpModule],
  controllers: [UserController],
  providers: [FilesService],
})
export class UserModule {}
