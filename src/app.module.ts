import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './common/typeorm/typeorm.module';
import { UsersModule } from './users/user.module';

@Module({
  // imports: [TypeOrmConfigModule],
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
