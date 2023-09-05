/* eslint-disable @typescript-eslint/no-inferrable-types */
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import ResultService from './result.service';
import { ResultEntity } from './entities/result.entity';
import CreateResultDTO from './dto/createResult.dto';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import ResultDTO from './dto/result.dto';

@ApiTags('Results')
@Controller('result')
@ApiBearerAuth()
export default class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Get(':id')
  @ApiOperation({ summary: 'get result by id' })
  @Unprotected()
  async getResultById(@Param('id') id: number): Promise<ResultEntity> {
    return await this.resultService.findResultById(id);
  }

  @Post()
  @Unprotected()
  @ApiOperation({ summary: 'create result after finish quiz' })
  async createResult(
    @Body() dto: CreateResultDTO, @RequestPayload() token: string
  ): Promise<{ mentalHealth: string, point: number }[] | { mentalHealth: string, point: number, degree: string }> {
    return await this.resultService.createResult(dto, token);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete result' })
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST] })
  async deleteResult(@Param('id') id: number) {
    return await this.resultService.deleteResult(id);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'get result by user ' })
  @Roles({ roles: [USER_CLIENT_ROLE.USER, USER_CLIENT_ROLE.ADMIN] })
  async getResultByUser(@RequestPayload() token: string): Promise<ResultDTO[]> {
    return await this.resultService.findResultByUserId(token);
  }

}
