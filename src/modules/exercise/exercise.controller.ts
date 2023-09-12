import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Patch,
    Query,
} from '@nestjs/common';

import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import ExerciseService from './exercise.services';
import { ExerciseEntity } from './entities/exercise.entity';
import findExerciseDTO from './dto/findExercise.dto';
import CreateExerciseDTO from './dto/createExercise.dto';
import UpdateExerciseDTO from './dto/updateExercise.dto';


@ApiTags('Exercise')
@Controller('exercise')
@ApiBearerAuth()
export default class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) { }

    @Get(':id')
    @Unprotected()
    @ApiOperation({ summary: 'get exercise by id' })
    async findExerciseById(@Param('id') id: number): Promise<ExerciseEntity> {
        return await this.exerciseService.findExerciseById(id);
    }

    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get exercise list' })
    async findExercise(@Query() dto: findExerciseDTO): Promise<ExerciseEntity[]> {
        return this.exerciseService.findExercise(dto);
    }

    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @Post()
    @ApiOperation({ summary: 'create exercise' })
    async createGenre(@Body() dto: CreateExerciseDTO): Promise<ExerciseEntity> {
        return this.exerciseService.createExercise(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'update exercise ' })
    async updateGenre(
        @Param('id') id: number,
        @Body() dto: UpdateExerciseDTO,
    ): Promise<ExerciseEntity> {
        return await this.exerciseService.updateExercise(id, dto);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'delete exercise ' })
    async deleteExercise(@Param('id') id: number) {
        return await this.exerciseService.deleteExercise(id);
    }

}
