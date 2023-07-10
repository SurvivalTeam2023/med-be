import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { In, Repository } from 'typeorm';
import { AudioEntity } from '../audio/entities/audio.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AI_SERVICE_URL } from 'src/environments';

@Injectable()
export default class RecommendationService {
  constructor(
    @InjectRepository(AudioEntity)
    private resultRepo: Repository<AudioEntity>,
    private readonly httpService: HttpService,
  ) { }
  async getRecommendationsService(user_id: string): Promise<AudioEntity[]> {
    console.log(user_id);
    const url = AI_SERVICE_URL + '/recommendation/user/?user_id=' + user_id;
    const listRecommendAudio = await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => response.data),
        catchError((err) => {
          return err;
        }),
      ),
    )
    const audioList = this.resultRepo.createQueryBuilder('audio')
      .leftJoin('audio.audioFile', 'audioFile')
      .leftJoin('audioFile.file', 'file')
      .select(['audio', 'audioFile', 'file.url'])
      .where('audio.id IN (:...ids)', { ids: listRecommendAudio })
      .getMany()

    return audioList;
  }
}
