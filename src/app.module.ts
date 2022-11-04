import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { ConfigModule } from '@nestjs/config';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { FilesModules } from './files/file.module';
@Module({
  // imports: [TypeOrmConfigModule],
  imports: [FilesModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
