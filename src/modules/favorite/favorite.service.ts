/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteGenreEntity } from './entities/favorite.entity';
import { DeleteResult, EntityManager, In, Repository } from 'typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { CreateFavoriteDTO } from './dto/createFavorite.dto';
import UserEntity from '../user/entities/user.entity';
import { GenreEntity } from '../genre/entities/genre.entity';
import { FavoriteStatus } from 'src/common/enums/favoriteStatus.enum';
import { getUserId } from 'src/utils/decode.utils';
@Injectable()
export default class FavoriteService {
  constructor(
    @InjectRepository(FavoriteGenreEntity)
    private favoriteRepo: Repository<FavoriteGenreEntity>,
    private readonly entityManage: EntityManager,
  ) { }
  async findAllFavorite(userId: string): Promise<FavoriteGenreEntity[]> {
    const querybuilder = this.favoriteRepo
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.genre', 'genre')
      .where('favorite.user_id = :user_id', { user_id: userId })
      .getMany();
    return querybuilder;
  }

  async createFavorite(
    dto: CreateFavoriteDTO,
    token: string,
  ): Promise<FavoriteGenreEntity[]> {
    let userId = getUserId(token);
    const user = await this.entityManage.findOne(UserEntity, {
      where: { id: userId },
    });
    if (!user) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const genres = await this.entityManage.find(GenreEntity, {
      where: { id: In(dto.genreId) },
    });
    if (!genres) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.GENRE.NOT_FOUND);
    }
    const favorites: FavoriteGenreEntity[] = [];
    for (const genre of genres) {
      const favorite = await this.favoriteRepo.save({
        user: user,
        genre: genre,
      });
      favorites.push(favorite);
    }
    return favorites;
  }
  async deleteFavorite(favoriteId: number): Promise<FavoriteGenreEntity> {
    const favorite = await this.favoriteRepo.findOne({
      where: { id: favoriteId },
    });
    if (favorite) {
      favorite.status = FavoriteStatus.INACTIVE;
      await this.favoriteRepo.save(favorite);
    }
    return favorite;
  }

  async isFavoriteExisted(token: string): Promise<{ exists: boolean }> {
    let userId = getUserId(token);
    const querybuilder = this.favoriteRepo
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.genre', 'genre')
      .where('favorite.user_id = :user_id', { user_id: userId })
      .getMany();
    // return querybuilder;
    const favorites = await querybuilder;
    const exists = favorites.length > 0;
    return { exists };
  }
}
