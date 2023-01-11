/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionTypeEntity } from './entities/subscriptionType.entity';
import SubscriptionTypeController from './subscriptionType.controller';
import SubscriptionTypeService from './subscriptionType.services';

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionTypeEntity])],
    controllers: [SubscriptionTypeController],
    providers: [SubscriptionTypeService],
    exports: [SubscriptionTypeService],
})
export class SubscriptionTypeModule { }
