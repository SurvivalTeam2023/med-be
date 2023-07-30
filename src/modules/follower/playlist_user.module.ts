import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistUserEntity } from './entities/playlist_user.entity';
import FollowerController from './playlist_user.controller';
import PlaylistUserService from './playlist_user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistUserEntity])],
  providers: [PlaylistUserService],
  controllers: [FollowerController],
})
export class FollowerModule {}
