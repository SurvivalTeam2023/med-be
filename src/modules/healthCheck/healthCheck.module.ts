/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthCheck.controller';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

@Module({
    imports: [TerminusModule, HttpModule],
    controllers: [HealthCheckController],
    providers: [],

})
export class HealthCheckModule { }
