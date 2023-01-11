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
import { SubscriptionTypeModule } from './modules/subscriptionType/subscriptionType.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
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
    SubscriptionTypeModule,
    FavoriteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
