import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UserController } from './user.controller';
import { KeycloakModule } from '../../common/config/keycloak.config';
import { File } from '../files/entities/file.entity';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.services';
@Module({
  imports: [TypeOrmModule.forFeature([User, File]), KeycloakModule, HttpModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
