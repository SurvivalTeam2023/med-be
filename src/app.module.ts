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
import { ArtistModule } from './modules/artist/artist.module';
import { UserLogModule } from './modules/userStatusLog/userStatusLog.module';
import { AudioPlaylistModule } from './modules/audioPlaylist/audioPlaylist.module';
import { FollowedArtistModule } from './modules/followedArtist/followedArtist.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { HealthCheckModule } from './modules/healthCheck/healthCheck.module';
import { RecommandationModule } from './modules/recommandations/recommendations.module';
import { AudioUserModule } from './modules/audioUser/audioUser.module';
import { FavoriteGenreModule } from './modules/genreUser/genreUser.module';

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
    ArtistModule,
    FollowedArtistModule,
    UserLogModule,
    WalletModule,
    HealthCheckModule,
    RecommandationModule,
    AudioUserModule,
    FavoriteGenreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
