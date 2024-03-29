import { Module } from '@nestjs/common';
import { FilesModules } from './modules/files/file.module';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { AudioModule } from './modules/audio/audio.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenreModule } from './modules/genre/genre.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
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
import { FollowerModule } from './modules/follower/playlist_user.module';
import { FaceModule } from './modules/face/face.module';
import { UserLogModule } from './modules/userStatusLog/userStatusLog.module';
import { AudioPlaylistModule } from './modules/audioPlaylist/audioPlaylist.module';
import { HealthCheckModule } from './modules/healthCheck/healthCheck.module';
import { RecommandationModule } from './modules/recommandations/recommendations.module';
import { AudioUserModule } from './modules/audioUser/audioUser.module';
import { FavoriteGenreModule } from './modules/genreUser/genreUser.module';
import { AgeModule } from './modules/age/age.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './intrerceptors/logging.interceptor';
import { PromptModule } from './modules/prompt/prompt.module';
import { MentalHealthDegreeLogModule } from './modules/mentalHealthDegreeLog/mentalHealthDegreeLog.module';
import { MentalHealthExerciseModule } from './modules/mentalHealthExercise/mentalHealthExercise.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { FMCModule } from './modules/fmc/fmc.module';

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
    UserLogModule,
    HealthCheckModule,
    RecommandationModule,
    AudioUserModule,
    FavoriteGenreModule,
    AgeModule,
    PromptModule,
    MentalHealthDegreeLogModule,
    MentalHealthExerciseModule,
    ExerciseModule,
    FMCModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule { }
