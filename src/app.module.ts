import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlaylistModule } from './modules/playlist/playlist.module';
import { OrmConfig } from './common/typeorm/orm.config';
import { AudioModule } from './modules/audio/audio.module';

@Module({
  imports: [
    AudioModule, PlaylistModule, TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    })
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
