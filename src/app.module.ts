import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioModule } from './audio/audio.module';
import { DataSource } from 'typeorm';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/environments';
import { Audio } from './audio/audio.entity';
import { Playlist } from './playlist/playlist.entity';
import AudioPlaylist from './audioPlaylist/audioPlaylist.entity';
import { PlaylistModule } from './playlist/playlist.module';


  // imports: [TypeOrmConfigModule],
  @Module({
    imports: [
      AudioModule,PlaylistModule, TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [Audio,Playlist,AudioPlaylist],
      synchronize: true,
      logging:true})
    ],
  })
export class AppModule {
constructor(private dataSource: DataSource) {}
}
