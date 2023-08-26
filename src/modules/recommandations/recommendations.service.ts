import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { EntityManager, In, Repository } from 'typeorm';
import { AudioEntity } from '../audio/entities/audio.entity';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AI_SERVICE_URL } from 'src/environments';
import { getUserId } from 'src/utils/decode.utils';
import { ResultEntity } from '../result/entities/result.entity';
import { MentalHealthEntity } from '../mentalHealth/entities/mentalHealth.entity';

@Injectable()
export default class RecommendationService {
  constructor(
    private readonly entityManage: EntityManager,

    @InjectRepository(AudioEntity)
    private resultRepo: Repository<AudioEntity>,
    private readonly httpService: HttpService,

  ) { }
  async getRecommendationsService(token: string): Promise<AudioEntity[]> {
    const user_id = getUserId(token)
    const url = AI_SERVICE_URL + '/recommendation/user/?user_id=' + user_id;
    const listRecommendAudio = await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => response.data),
        catchError((err) => {
          return err;
        }),
      ),
    )
    const audios = await this.resultRepo.createQueryBuilder('audio')
      .leftJoin('audio.audioFile', 'audioFile')
      .leftJoin('audioFile.file', 'file')
      .leftJoin('audio.artist', 'artist')
      .select(['audio', 'artist', 'audioFile.id', 'file.url'])
      .where('audio.id IN (:...ids)', { ids: listRecommendAudio })
      .getMany()
    return audios;
  }
  async getRecommendationsByMental(token: string): Promise<any> {
    const user_id = getUserId(token)
    const result = await this.entityManage.findOne(ResultEntity, {
      relations: {
        user: true
      },
      where: {
        user: {
          id: user_id,
        }
      },
      order: {
        createdAt: "DESC"
      }
    })
    const highestPoint = result.mentalHealth.reduce((maxPoint, currentObj) => {
      return currentObj.point > maxPoint ? currentObj.point : maxPoint;
    }, 0);
    const highestPointObjects = result.mentalHealth.filter((obj) => obj.point === highestPoint);
    const mentalHealthIds = await Promise.all(highestPointObjects.map(async e => {
      const mentalHealth = await this.entityManage.findOne(MentalHealthEntity, {
        where: {
          name: e.mentalHealth
        }
      });
      return mentalHealth.id;
    }));




    let list = []
    for (const id of await mentalHealthIds) {
      const url = AI_SERVICE_URL + '/recommendation/mental/?mental_id=' + id;
      const listRecommendAudio = await firstValueFrom(
        this.httpService.get(url).pipe(
          map((response) => response.data),
          catchError((err) => {
            return err;
          }),
        ),
      )
      const audios = await this.resultRepo.createQueryBuilder('audio')
        .leftJoin('audio.audioFile', 'audioFile')
        .leftJoin('audioFile.file', 'file')
        .leftJoin('audio.artist', 'artist')
        .select(['audio', 'artist', 'audioFile.id', 'file.url'])
        .where('audio.id IN (:...ids)', { ids: listRecommendAudio })
        .getMany()

      list = [...audios]
    }

    return { mentalHealths: highestPointObjects, list };
  }

  async getRecommendationsByAudio(audioId: number): Promise<AudioEntity[]> {
    const url = AI_SERVICE_URL + '/recommendation/audio/?audio_id=' + audioId;

    const listRecommendAudio = await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => response.data),
        catchError((err) => {
          return err;
        }),
      ),
    )
    const audios = await this.resultRepo.createQueryBuilder('audio')
      .leftJoin('audio.audioFile', 'audioFile')
      .leftJoin('audioFile.file', 'file')
      .leftJoin('audio.artist', 'artist')
      .select(['audio', 'artist', 'audioFile.id', 'file.url'])
      .where('audio.id IN (:...ids)', { ids: listRecommendAudio })
      .getMany()

    return audios;
  }

  async getRecommendationsByMentalId(mentalId: number): Promise<any> {
    const url = AI_SERVICE_URL + '/recommendation/mental/?mental_id=' + mentalId;

    const listRecommendAudio = await firstValueFrom(
      this.httpService.get(url).pipe(
        map((response) => response.data),
        catchError((err) => {
          return err;
        }),
      ),
    )
    const mentalHealth = await this.entityManage.findOne(MentalHealthEntity, {
      where: {
        id: mentalId
      }
    })
    const audios = await this.resultRepo.createQueryBuilder('audio')
      .leftJoin('audio.audioFile', 'audioFile')
      .leftJoin('audioFile.file', 'file')
      .leftJoin('audio.artist', 'artist')
      .select(['audio', 'artist', 'audioFile.id', 'file.url'])
      .where('audio.id IN (:...ids)', { ids: listRecommendAudio })
      .getMany()

    return { mentalHealth: mentalHealth.name, audios };
  }
}
