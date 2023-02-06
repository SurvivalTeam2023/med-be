/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { KeycloakModule } from '../../common/config/keycloak.config';
import { FileEntity } from '../files/entities/file.entity';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.services';
import { AuthModule } from '../auth/auth.module';
import UserEntity from './entities/user.entity';
import ArtistEntity from '../artist/entities/artist.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FileEntity, ArtistEntity]),
    KeycloakModule,
    HttpModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
