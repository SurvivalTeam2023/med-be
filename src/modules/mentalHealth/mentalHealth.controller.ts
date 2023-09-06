
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import CreateMentalHealthDTO from './dto/createMentalHealth.dto';
import FindMentalHealthDTO from './dto/findMentalHealth.dto';
import UpdateMentalHealthDTO from './dto/updateMentalHealth.dto';
import { MentalHealthEntity } from './entities/mentalHealth.entity';
import MentalHealthService from './mentalHealth.service';
import ChooseMentalDTO from './dto/chooseMental.dto';
import { MentalHealthDegreeLogEntity } from '../mentalHealthDegreeLog/entities/mentalHealthDegreeLog.entity';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';

@ApiTags('MentalHealth')
@Controller('mentalHealth')
@ApiBearerAuth()
export default class MentalHealthController {
    constructor(private readonly mentalHealthService: MentalHealthService) { }

    @Get(':id')
    @Unprotected()
    @ApiOperation({ summary: 'get mental health by id' })
    async findMentalHealthById(@Param('id') id: number): Promise<MentalHealthEntity> {
        return this.mentalHealthService.findMentalHealthById(id);
    }

    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get mental health list' })
    async findMentalHealth(
        @Query() dto: FindMentalHealthDTO,
    ): Promise<MentalHealthEntity[]> {
        return this.mentalHealthService.findMentalHealth(dto)
    }
    @Unprotected()
    @Post()
    @ApiOperation({ summary: 'create mental health' })
    async createMentalHealth(
        @Body() dto: CreateMentalHealthDTO,
    ): Promise<MentalHealthEntity> {
        return this.mentalHealthService.createMentalHealth(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'update mental health ' })
    async updateMentalHealth(
        @Param('id') id: number,
        @Body() dto: UpdateMentalHealthDTO,
    ): Promise<MentalHealthEntity> {
        return await this.mentalHealthService.updateMentalHealth(dto, id);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'delete mental health ' })
    async deleteMentalHealth(@Param('id') id: number) {
        return await this.mentalHealthService.deleteMentalHealth(id);
    }

    @Unprotected()
    @Post('user')
    @ApiOperation({ summary: 'choose mental health' })
    async chooseMentalHealth(
        @Body() dto: ChooseMentalDTO,
        @RequestPayload() token: string
    ): Promise<MentalHealthDegreeLogEntity[]> {
        return this.mentalHealthService.chooseMental(dto, token);
    }
}
