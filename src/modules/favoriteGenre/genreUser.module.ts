import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreUserEntity } from './entities/genreUser.entity';
import GenreUserService from './genreUser.service';
import GenreUserController from './genreUser.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GenreUserEntity])],
  providers: [GenreUserService],
  controllers: [GenreUserController],
  exports: [GenreUserService],
})
export class FavoriteGenreModule {}
