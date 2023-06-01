/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionEntity } from './entities/subscription.entity';
import SubscriptionController from './subscription.controller';
import SubscriptionService from './subscription.services';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionEntity]), HttpModule, AuthModule, UserModule],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule { }
