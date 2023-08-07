
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
import CreateMentalHealthDegreeDTO from './dto/createMentalHealthDegree.dto';
import FindMentalHealthDegreeDTO from './dto/findMentalHealthDegree.dto';
import UpdateMentalHealthDegreeDTO from './dto/updateMentalHealthDegree.dto';
import { MentalHealthDegreeEntity } from './entities/mentalHealthDegree.entity';
import MentalHealthDegreeService from './mentalHealthDegree.service';

@ApiTags('Mental Health Degree')
@Controller('mentalHealthDegree')
@ApiBearerAuth()
export default class MentalHealthDegreeController {
    constructor(private readonly mentalHealthDegreeService: MentalHealthDegreeService) { }

    @Get(':id')
    @Unprotected()
    async findMentalHealthDegreeById(@Param('id') id: number): Promise<MentalHealthDegreeEntity> {
        return this.mentalHealthDegreeService.findMentalHealthDegreeById(id);
    }

    @Get()
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async findMentalHealthDegree(
        @Query() dto: FindMentalHealthDegreeDTO,
    ): Promise<MentalHealthDegreeEntity[]> {
        return this.mentalHealthDegreeService.findMentalHealthDegree(dto)
    }
    @Unprotected()
    @Post()
    async createMentalHealthDegree(
        @Body() dto: CreateMentalHealthDegreeDTO,
    ): Promise<MentalHealthDegreeEntity> {
        return this.mentalHealthDegreeService.createMentalHealthDegree(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async updateMentalHealthDegree(
        @Param('id') id: number,
        @Body() dto: UpdateMentalHealthDegreeDTO,
    ): Promise<MentalHealthDegreeEntity> {
        return await this.mentalHealthDegreeService.updateMentalHealthDegree(id, dto);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async deleteMentalHealth(@Param('id') id: number) {
        return await this.mentalHealthDegreeService.deleteMentalHealthDegree(id);
    }
}
