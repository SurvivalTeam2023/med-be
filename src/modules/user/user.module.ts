import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UserController } from './user.controller';
import { KeycloakModule } from '../../common/config/keycloak.config';
import { File } from '../files/entities/file.entity';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.services';
import { AuthModule } from '../auth/auth.module';
import Artist from '../artist/entities/artist.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, File, Artist]), KeycloakModule, HttpModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
