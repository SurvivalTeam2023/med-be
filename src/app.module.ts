import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';

import { FilesModules } from './modules/files/file.module';
import { UsersModule } from './modules/users/users.module';
@Module({
  // imports: [TypeOrmConfigModule],
  imports: [TypeOrmConfigModule, UsersModule, FilesModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
