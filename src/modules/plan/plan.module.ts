/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PlanEntity } from './entities/plan.entity';
import PlanController from './plan.controller';
import PlanService from './plan.services';

@Module({
    imports: [TypeOrmModule.forFeature([PlanEntity]), HttpModule, AuthModule],
    controllers: [PlanController],
    providers: [PlanService],
    exports: [PlanService],
})
export class PlanModule { }
