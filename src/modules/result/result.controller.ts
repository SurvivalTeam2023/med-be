/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import ResultService from './result.service';
import { ResultEntity } from './entities/result.entity';
import CreateResultDTO from './dto/createResult.dto';

@ApiTags('Results')
@Controller('result')
@ApiBearerAuth()
export default class ResultController {
    constructor(private readonly resultService: ResultService) { }

    @Get(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST, USER_CLIENT_ROLE.ADMIN] })
    async getResultById(@Param('id') id: number): Promise<ResultEntity> {
        return await this.resultService.findResultById(id);
    }

    @Post()
    @Unprotected()
    async createResult(
        @Body() dto: CreateResultDTO,
    ): Promise<ResultEntity> {
        return await this.resultService.createResult(dto);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
    async deleteResult(@Param('id') id: number) {
        return await this.resultService.deleteResult(id);
    }
}
