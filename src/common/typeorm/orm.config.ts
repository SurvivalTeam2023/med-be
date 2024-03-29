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
import { AudioPlaylistEntity } from 'src/modules/audioPlaylist/entities/audioPlaylist.entity';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import { AudioGenreEntity } from 'src/modules/audioGenre/entities/audioGenre.entities';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { MentalHealthEntity } from 'src/modules/mentalHealth/entities/mentalHealth.entity';
import { QuestionEntity } from 'src/modules/question/entities/question.entity';
import { OptionEntity } from 'src/modules/option/entities/option.entity';
import UserEntity from 'src/modules/user/entities/user.entity';
import { QuestionBankEntity } from 'src/modules/questionBank/entities/questionBank.entity';
import { QuestionBankQuestionEntity } from 'src/modules/questionBankQuestion/entities/questionBankQuestion.entity';
import { ResultEntity } from 'src/modules/result/entities/result.entity';
import { HistoryEntity } from 'src/modules/history/entities/history.entity';
import { QuestionMentalHealthEntity } from 'src/modules/questionMentalHealth/entities/questionMentalHealth.entity';
import { MentalHealthDegreeEntity } from 'src/modules/mentalHealthDegree/entities/mentalHealthDegree.entity';
import { MentalHealthLogEntity } from 'src/modules/mentalHealthLog/entities/mentalHealthLog.entity';
import { MentalHealthDegreeLogEntity } from 'src/modules/mentalHealthDegreeLog/entities/mentalHealthDegreeLog.entity';
import { SubscriptionEntity } from 'src/modules/subscription/entities/subscription.entity';
import { PlanEntity } from 'src/modules/plan/entities/plan.entity';
import { UserStatusLogEntity } from 'src/modules/userStatusLog/entity/userStatusLog.entity';
import { GenreUserEntity } from 'src/modules/genreUser/entities/genreUser.entity';
import { AgeEntity } from 'src/modules/age/entities/age.entity';
import { AudioFileEntity } from 'src/modules/audioFile/entities/audioFile.entity';
import { AudioUserEntity } from 'src/modules/audioUser/entities/audioUser.entity';
import { PlaylistUserEntity } from 'src/modules/follower/entities/playlist_user.entity';
import { PromptEntity } from 'src/modules/prompt/entities/prompt.entity';
import { PromptDetailEntity } from 'src/modules/promptDetail/entities/promptDetail.entity';
import { ExerciseEntity } from 'src/modules/exercise/entities/exercise.entity';
import { MentalHealthExerciseEntity } from 'src/modules/mentalHealthExercise/entities/mentalHealthExercise.entity';
const entities = [
  AudioEntity,
  PlaylistEntity,
  AudioPlaylistEntity,
  UserEntity,
  FileEntity,
  AudioGenreEntity,
  GenreEntity,
  MentalHealthEntity,
  QuestionEntity,
  OptionEntity,
  QuestionBankEntity,
  QuestionBankQuestionEntity,
  ResultEntity,
  HistoryEntity,
  QuestionMentalHealthEntity,
  MentalHealthDegreeEntity,
  MentalHealthLogEntity,
  MentalHealthDegreeLogEntity,
  SubscriptionEntity,
  PlanEntity,
  GenreUserEntity,
  UserStatusLogEntity,
  AgeEntity,
  AudioFileEntity,
  AudioUserEntity,
  PlaylistUserEntity,
  PromptEntity,
  PromptDetailEntity,
  ExerciseEntity,
  MentalHealthExerciseEntity,
];
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
      migrations: ['dist/**/migrations/*.js'],
      entities,
      migrationsRun: false
    };
    return baseOptions;
  }
}
