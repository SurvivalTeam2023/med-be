/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SubscriptionEntity } from './entities/subscription.entity';
import SubscriptionController from './subscription.controller';
import SubscriptionService from './subscription.services';

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionEntity]), HttpModule, AuthModule],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule { }
