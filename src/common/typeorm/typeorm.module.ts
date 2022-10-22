import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfig } from './orm.config';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: OrmConfig,
    }),
  ],
})
export class TypeOrmConfigModule {}
