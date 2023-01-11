/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import SubscriptionController from './subscription.controller';
import SubscriptionService from './subscription.services';

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule { }
