import { HttpModule } from '@nestjs/axios';
import { UsersService } from './user.services';
import { UsersController } from './user.controller';
// import { AuthModule } from '../authKeycloak/auth.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../authKeycloak/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }