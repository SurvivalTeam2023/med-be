import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { OrmConfig } from './common/typeorm/orm.config';
import { AudioModule } from './modules/audio/audio.module';

import { FilesModules } from './modules/files/file.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  // imports: [TypeOrmConfigModule],
  imports: [TypeOrmConfigModule, UsersModule, FilesModules],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
