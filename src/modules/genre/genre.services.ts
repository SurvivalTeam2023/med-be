/* eslint-disable prettier/prettier */
import { Emotion } from '@aws-sdk/client-rekognition';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { EmotionEnum } from 'src/common/enums/emotion.enum';
import { GenreStatus } from 'src/common/enums/genreStatus.enum';
import { ErrorHelper } from 'src/helpers/error.helper';
import { EntityManager, Repository } from 'typeorm';
import { AudioGenreEntity } from '../audioGenre/entities/audioGenre.entities';
import AddGenreToAudioDTO from './dto/addGenreToAudio.dto';
import CreateGenreDTO from './dto/createGenre.dto';
import UpdateGenreDTO from './dto/updateGenre.dto';
import { GenreEntity } from './entities/genre.entity';
import { ResultEntity } from '../result/entities/result.entity';
import { QuestionEntity } from '../question/entities/question.entity';
import { MentalHealthEntity } from '../mentalHealth/entities/mentalHealth.entity';
import { OptionEntity } from '../option/entities/option.entity';
import { QuestionMentalHealthEntity } from '../questionMentalHealth/entities/questionMentalHealth.entity';

@Injectable()
export default class GenreService {
  constructor(
    private readonly entityManage: EntityManager,
    @InjectRepository(GenreEntity)
    private genreRepo: Repository<GenreEntity>,
  ) { }

  async createGenre(dto: CreateGenreDTO): Promise<GenreEntity> {
    const newGenre = this.genreRepo.save({
      ...dto,
    });
    return newGenre;
  }

  async findGenreById(genreId: number): Promise<GenreEntity> {
    const genre = await this.genreRepo.findOneBy({
      id: genreId,
    });
    return genre;
  }

  async findGenres(name?: string): Promise<GenreEntity[]> {
    const queryBuilder = await this.genreRepo.createQueryBuilder('genre')
    if (name) queryBuilder.where('LOWER(genre.name) like :name', { name: `%${name}%` }).orderBy('genre.name', 'ASC')


    return queryBuilder.orderBy('genre.name', 'ASC').getMany()
  }
  async updateGenre(
    genreId: number,
    dto: UpdateGenreDTO,
  ): Promise<GenreEntity> {
    const genre = await this.findGenreById(genreId);
    if (!genre) ErrorHelper.NotFoundException(ERROR_MESSAGE.GENRE.NOT_FOUND);

    const updatedGenre = await this.genreRepo.save({
      id: genre.id,
      ...dto,
    });
    return updatedGenre;
  }

  async deleteGenre(genreId: number): Promise<GenreEntity> {
    const genre = await this.findGenreById(genreId);
    if (!genre) ErrorHelper.NotFoundException(ERROR_MESSAGE.GENRE.NOT_FOUND);
    const updatedGenre = this.genreRepo.save({
      id: genre.id,
      status: GenreStatus.INACTIVE,
    });
    return updatedGenre;
  }
  async getGenreByEmotion(emotions: Emotion[]): Promise<GenreEntity[]> {
    const genre = await this.genreRepo.createQueryBuilder('genre')
      .where('genre.emotion like :emotion', { emotion: `%${emotions[0].Type}%` }).orderBy('genre.name', 'ASC').getMany()
    return genre
  }

  async getGenreByResult(questionBankId: number): Promise<GenreEntity[]> {
    const results = await this.entityManage.find(ResultEntity, {
      where: {
        questionBankId: questionBankId
      }
    });

    const questionMap = new Map<QuestionEntity, number>();
    const mentalHealthMap = new Map<string, number>();

    await Promise.all(
      results.map(async (result) => {
        const option = await this.entityManage.findOne(OptionEntity, {
          relations: {
            question: true
          },
          where: {
            id: result.optionId
          }
        });

        questionMap.set(option.question, option.points);
      })
    );

    await Promise.all(
      Array.from(questionMap.entries()).map(async ([key, value]) => {
        const question = await this.entityManage.findOne(QuestionEntity, {
          relations: {
            questionMentalHealth: true
          },
          where: {
            id: key.id
          }
        });

        for (const e of question.questionMentalHealth) {
          const questionMentalHealth = await this.entityManage.findOne(QuestionMentalHealthEntity, {
            relations: {
              mentalHealth: true
            },
            where: {
              id: e.id
            }
          });

          const mentalHealth = questionMentalHealth.mentalHealth.name;
          const updateValue = mentalHealthMap.get(mentalHealth) || 0;
          mentalHealthMap.set(mentalHealth, updateValue + value);
        }
      })
    );

    let highestPoint: [string, number];
    for (const entry of mentalHealthMap.entries()) {
      if (!highestPoint || entry[1] > highestPoint[1]) {
        highestPoint = entry;
      }
    }

    const genre = await this.genreRepo.find({
      relations: {
        mentalHealthGenre: true
      },
      where: {
        mentalHealthGenre: {
          mentalHealth: {
            name: highestPoint[0]
          }
        }
      }
    });

    return genre;
  }

}
