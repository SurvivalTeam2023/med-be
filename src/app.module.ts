import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';

import { FilesModules } from './files/file.module';
@Module({
  // imports: [TypeOrmConfigModule],
  imports: [TypeOrmConfigModule, FilesModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
