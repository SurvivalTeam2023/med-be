import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Audio } from 'src/modules/audio/entities/audio.entity';
import AudioPlaylist from 'src/modules/audio/entities/audioPlaylist.entity';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/environments';
import { Playlist } from 'src/modules/playlist/entities/playlist.entity';
import User from 'src/modules/user/entities/user.entity';
import { File } from 'src/modules/files/entities/file.entity';
const entities = [Audio, Playlist, AudioPlaylist, User, File];
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
      logging: true,
      entities,
    };
    return baseOptions;
  }
}
