import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { Repository } from 'typeorm';
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
  ) {}
  async getRecommendationsService(user_id: string): Promise<[]> {
    console.log(user_id);
    const url = AI_SERVICE_URL + '/recommendation/user/?user_id=' + user_id;
    const listRecommenAudio = await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => response.data),
        catchError((err) => {
          console.log(err);
          return err;
        }),
      ),
    );
    console.log(listRecommenAudio);
    return [];
  }
}
