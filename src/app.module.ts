/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilesModules } from './modules/files/file.module';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { AudioModule } from './modules/audio/audio.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenreModule } from './modules/genre/genre.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { PlanModule } from './modules/plan/plan.module';
import { HistoryModule } from './modules/history/history.module';
import { QuestionModule } from './modules/question/question.module';
import { OptionModule } from './modules/option/option.module';
import { ResultModule } from './modules/result/result.module';
import { MentalHealthModule } from './modules/mentalHealth/mentalHealth.module';
import { MentalHealthDegreeModule } from './modules/mentalHealthDegree/mentalHealthDegree.module';
import { QuestionBankModule } from './modules/questionBank/questionBank.modul';
import { AudioGenreModule } from './modules/audioGenre/audioGenre.module';
import { ScheduleModule } from '@nestjs/schedule/dist';
import { FollowerModule } from './modules/follower/follower.module';
import { FaceModule } from './modules/face/face.module';
import { ArtistModule } from './modules/artist/artist.module';
import { UserLogModule } from './modules/userStatusLog/userStatusLog.module';
import { AudioPlaylistModule } from './modules/audioPlaylist/audioPlaylist.module';


@Module({
  imports: [
    TypeOrmConfigModule,
    UserModule,
    AudioModule,
    PlaylistModule,
    FilesModules,
    AuthModule,
    GenreModule,
    SubscriptionModule,
    PlanModule,
    FavoriteModule,
    HistoryModule,
    QuestionModule,
    OptionModule,
    ResultModule,
    MentalHealthModule,
    MentalHealthDegreeModule,
    QuestionBankModule,
    AudioGenreModule,
    FollowerModule,
    ScheduleModule.forRoot(),
    FaceModule,
    AudioPlaylistModule,
    ArtistModule,
    UserLogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
