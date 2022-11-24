/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilesModules } from './modules/files/file.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { AudioModule } from './modules/audio/audio.module';
import { PlaylistModule } from './modules/playlist/playlist.module';
@Module({
  imports: [
    TypeOrmConfigModule,
    UsersModule,
    AudioModule,
    PlaylistModule,
    FilesModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
