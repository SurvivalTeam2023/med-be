import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentalHealthEntity } from './entities/mentalHealth.entity';
import MentalHealthController from './mentalHealth.controller';
import MentalHealthService from './mentalHealth.service';



@Module({
    imports: [TypeOrmModule.forFeature([MentalHealthEntity])],
    controllers: [MentalHealthController],
    providers: [MentalHealthService],
})
export class MentalHealthModule { }
