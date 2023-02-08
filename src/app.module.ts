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
import { QuestionModule } from './modules/question/question.module';
import { OptionModule } from './modules/option/option.module';
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
    QuestionModule,
    OptionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
