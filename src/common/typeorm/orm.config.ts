import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AudioEntity } from 'src/modules/audio/entities/audio.entity';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/environments';
import { FileEntity } from 'src/modules/files/entities/file.entity';
import { AudioPlaylistEntity } from 'src/modules/playlistAudio/entities/audioPlaylist.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import { PlaylistTypeEntity } from 'src/modules/playlistType/entities/playlistType.entity';
import { AudioGenreEntity } from 'src/modules/audioGenre/entities/audioGenre.entities';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { WalletEntity } from 'src/modules/wallet/entities/wallet.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import { MentalHealthGenreEntity } from 'src/modules/mentalHealthGenre/entities/mentalHealthGenre.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import ArtistEntity from 'src/modules/artist/entities/artist.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import { QuestionBankQuestionEntity } from 'src/modules/questionBankQuestion/entities/questionBankQuestion.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';
import { FollowerEntity } from 'src/modules/follower/entities/follower.entity';
import { SubcriptionEntity } from 'src/modules/subcription/entities/subcription.entity';
import { SubcriptionTypeEntity } from 'src/modules/subcriptionType/entities/subcriptionType.entity';
import { HistoryEntity } from 'src/modules/history/entities/history.entity';
import { AccessEntity } from 'src/modules/access/entities/access.entity';
const entities = [
  AudioEntity,
  PlaylistEntity,
  AudioPlaylistEntity,
  UserEntity,
  FileEntity,
  ArtistEntity,
  PlaylistTypeEntity,
  AudioGenreEntity,
  GenreEntity,
  WalletEntity,
  MentalHealthEntity,
  MentalHealthGenreEntity,
  QuestionEntity,
  OptionEntity,
  QuestionBankEntity,
  QuestionBankQuestionEntity,
  ResultEntity,
  FollowerEntity,
  SubcriptionEntity,
  SubcriptionTypeEntity,
  HistoryEntity,
  AccessEntity];
@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const baseOptions: TypeOrmModuleOptions = {
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: true,
      logging: false,
      entities,
    };
    return baseOptions;
  }
}