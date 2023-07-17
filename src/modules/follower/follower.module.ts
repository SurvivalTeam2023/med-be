import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerEntity } from './entities/follower.entity';
import FollowerController from './follower.controller';
import FollowerService from './follower.service';

@Module({
  imports: [TypeOrmModule.forFeature([FollowerEntity])],
  providers: [FollowerService],
  controllers: [FollowerController],
})
export class FollowerModule {}
