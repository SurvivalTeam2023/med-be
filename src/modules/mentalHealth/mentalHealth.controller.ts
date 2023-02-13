
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import CreateMentalHealthDTO from './dto/createMentalHealth.dto';
import FindMentalHealthDTO from './dto/findMentalHealth.dto';
import UpdateMentalHealthDTO from './dto/updateMentalHealth.dto';
import { MentalHealthEntity } from './entities/mentalHealth.entity';
import MentalHealthService from './mentalHealth.service';

@ApiTags('MentalHealth')
@Controller('mentalHealth')
@ApiBearerAuth()
export default class MentalHealthController {
    constructor(private readonly mentalHealthService: MentalHealthService) { }

    @Get(':id')
    @Unprotected()
    async findMentalHealthById(@Param('id') id: number): Promise<MentalHealthEntity> {
        return this.mentalHealthService.findMentalHealthById(id);
    }

    @Get()
    @Unprotected()
    async findMentalHealth(
        @Query() dto: FindMentalHealthDTO,
    ): Promise<MentalHealthEntity[]> {
        return this.mentalHealthService.findMentalHealth(dto)
    }
    @Unprotected()
    @Post()
    async createMentalHealth(
        @Body() dto: CreateMentalHealthDTO,
    ): Promise<MentalHealthEntity> {
        return this.mentalHealthService.createMentalHealth(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async updateMentalHealth(
        @Param('id') id: number,
        @Body() dto: UpdateMentalHealthDTO,
    ): Promise<MentalHealthEntity> {
        return await this.mentalHealthService.updateMentalHealth(dto, id);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async deleteMentalHealth(@Param('id') id: number) {
        return await this.mentalHealthService.deleteMentalHealth(id);
    }
}
