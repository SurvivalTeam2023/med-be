import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Audio } from 'src/audio/entities/audio.entity';
import AudioPlaylist from 'src/audioPlaylist/entities/audioPlaylist.entity';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/environments';
import { Playlist } from 'src/playlist/entities/playlist.entity';
const entities = [Audio,Playlist,AudioPlaylist];
@Injectable()
export class OrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const baseOptions: TypeOrmModuleOptions = {
      type: 'postgres',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: true,
      entities,
      logging:true
    };
    return baseOptions;
  }
}


