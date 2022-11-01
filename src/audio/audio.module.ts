import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AudioController from './audio.controller';
import { Audio } from './audio.entity';
import AudioService from './audio.services';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Audio])],
    controllers: [AudioController],
    providers: [AudioService],

  
})
export class AudioModule {}