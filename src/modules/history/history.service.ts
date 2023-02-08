import { InjectRepository } from "@nestjs/typeorm";
import { ERROR_MESSAGE } from "src/common/constants/messages.constant";
import { ErrorHelper } from "src/helpers/error.helper";
import { EntityManager, Repository } from "typeorm";
import { AudioEntity } from "../audio/entities/audio.entity";
import UserEntity from "../user/entities/user.entity";
import CreateHistoryDTO from "./dto/createHistory.dto";
import { HistoryEntity } from "./entities/history.entity";
import jwt_decode from "jwt-decode";



export default class HistoryService {
    constructor(
        @InjectRepository(HistoryEntity)
        private historyRepo: Repository<HistoryEntity>,
        private readonly entityManage: EntityManager,
      ) {}

      async createHistory(dto: CreateHistoryDTO, token: string): Promise<HistoryEntity> {
        let decoded_token = jwt_decode(token);
        let userId = decoded_token['sub']
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