import { Module } from '@nestjs/common';
import { FilesModules } from './modules/files/file.module';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { AudioModule } from './modules/audio/audio.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { GenreModule } from './modules/genre/genre.module';
@Module({
  imports: [
    TypeOrmConfigModule,
    UserModule,
    AudioModule,
    PlaylistModule,
    FilesModules,
    AuthModule,
    GenreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
