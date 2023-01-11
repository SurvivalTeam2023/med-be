import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import FavoriteController from './favorite.controller';
import FavoriteService from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  providers: [FavoriteService],
  controllers: [FavoriteController],
  exports: [FavoriteService],
})
export class FavoriteModule {}
