import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/modules/playlist/entities/playlist.entity';
import PlaylistController from 'src/modules/playlist/playlist.controller';
import PlaylistService from 'src/modules/playlist/playlist.service';
import { ResultEntity } from './entities/result.entity';
import ResultController from './result.controller';
import ResultService from './result.service';

@Module({
    imports: [TypeOrmModule.forFeature([ResultEntity])],
    controllers: [ResultController],
    providers: [ResultService],
})
export class ResultModule { }
