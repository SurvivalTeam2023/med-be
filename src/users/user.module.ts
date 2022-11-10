import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersService } from './user.services';
import { UsersController } from './user.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
})
export class UsersModule { }