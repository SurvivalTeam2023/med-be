import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioModule } from './audio/audio.module';
import { DataSource } from 'typeorm';
import { OrmConfig } from './common/typeorm/orm.config';

  // imports: [TypeOrmConfigModule],
  @Module({
    imports: [
      AudioModule, TypeOrmModule.forRoot()
    ],
  })
export class AppModule {
constructor(private dataSource: DataSource) {}
}
