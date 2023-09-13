import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { KeycloakModule } from '../../common/config/keycloak.config';
import { FileEntity } from '../files/entities/file.entity';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.services';
import { AuthModule } from '../auth/auth.module';
import UserEntity from './entities/user.entity';
import { FilesModules } from '../files/file.module';
@Module({
  imports: [FilesModules, TypeOrmModule.forFeature([UserEntity, FileEntity]), KeycloakModule, HttpModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
