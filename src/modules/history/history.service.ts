/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';
import { EntityManager, Repository } from 'typeorm';
import { AudioEntity } from '../audio/entities/audio.entity';
import UserEntity from '../user/entities/user.entity';
import CreateHistoryDTO from './dto/createHistory.dto';
import { HistoryEntity } from './entities/history.entity';
import { getUserId } from 'src/utils/decode.utils';

export default class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepo: Repository<HistoryEntity>,
    private readonly entityManage: EntityManager,
  ) {}

  async findHistory(userId: string): Promise<HistoryEntity[]> {
    const querybuilder = await this.historyRepo
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.audioId', 'audio')
      .where('history.user_id = :user_id', { user_id: userId })
      .orderBy('history.last_updated_at', 'DESC')
      .getMany();
    return querybuilder;
  }

  async createHistory(
    dto: CreateHistoryDTO,
    token: string,
  ): Promise<HistoryEntity> {
    let userId = getUserId(token);
    const user = await this.entityManage.findOne(UserEntity, {
      where: { id: userId },
    });
    if (!user) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
    const audio = await this.entityManage.findOne(AudioEntity, {
      where: { id: dto.audioId },
    });
    if (!audio) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.AUDIO.NOT_FOUND);
    }
    const history = await this.historyRepo.save({
      ...dto,
      userId: user,
      audioId: audio,
    });
    return history;
  }
}