/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteEntity } from './entities/favorite.entity';
import { DeleteResult, EntityManager, Repository } from 'typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { CreateFavoriteDTO } from './dto/createFavorite.dto';
import UserEntity from '../user/entities/user.entity';
import { GenreEntity } from '../genre/entities/genre.entity';
import { FavoriteStatus } from 'src/common/enums/favoriteStatus.enum';
import jwt_decode from "jwt-decode";
@Injectable()
export default class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private favoriteRepo: Repository<FavoriteEntity>,
    private readonly entityManage: EntityManager,
  ) {}
  async findAllFavorite(userId: string): Promise<FavoriteEntity[]> {
    const querybuilder = this.favoriteRepo
      .createQueryBuilder('favorite')
      .leftJoinAndSelect('favorite.genreId', 'genre')
      .where('favorite.user_id = :user_id', { user_id: userId })
      .getMany();
    console.log('userid', userId);
    return querybuilder;
  }

  async createFavorite(dto: CreateFavoriteDTO, token: string): Promise<FavoriteEntity> {
    let decoded_token = jwt_decode(token);
        let userId = decoded_token['sub']
    const user = await this.entityManage.findOne(UserEntity, {
      where: { id: userId },
    });
    if (!user) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const genre = await this.entityManage.findOne(GenreEntity, {
      where: { id: dto.genreId },
    });
    if (!genre) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.GENRE.NOT_FOUND);
    }
    const favorite = await this.favoriteRepo.save({
      ...dto,
      userId: user,
      genreId: genre,
    });
    return favorite;
  }
  async deleteFavorite(favoriteId: number): Promise<FavoriteEntity> {
    const favorite = await this.favoriteRepo.findOne({
      where: { id: favoriteId },
    });
    if (favorite) {
      favorite.status = FavoriteStatus.INACTIVE;
      await this.favoriteRepo.save(favorite);
    }
    return favorite;
  }
}
