import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import RecommendationController from './recommendations.controller';
import { AudioEntity } from '../audio/entities/audio.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import RecommendationService from './recommendations.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([AudioEntity])],
  controllers: [RecommendationController],
  providers: [RecommendationService],
})
export class RecommandationModule {}
