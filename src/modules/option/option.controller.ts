
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
import { Pagination } from 'nestjs-typeorm-paginate';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import OptionService from './option.service';
import { OptionEntity } from './entities/option.entity';
import SearchOptionDTO from './dto/searchOption.dto';
import CreateOptionDTO from './dto/createOption.dto';
import UpdateOptionDTO from './dto/updateOption.dto';


@ApiTags('Options')
@Controller('option')
@ApiBearerAuth()
export default class OptionController {
    constructor(private readonly optionService: OptionService) { }

    @Get(':id')
    @Unprotected()
    @ApiOperation({ summary: 'find option by id' })
    async findOptionById(@Param('id') id: number): Promise<OptionEntity> {
        return this.optionService.findOptionById(id);
    }

    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get option list' })
    @ApiQuery({
        name: 'page',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
    })
    async findOptions(
        @Query() dto: SearchOptionDTO,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<OptionEntity>> {
        limit = limit > 100 ? 100 : limit;
        return this.optionService.findOption(dto, {
            page,
            limit,
        });
    }

    @Unprotected()
    @Post()
    @ApiOperation({ summary: 'create option' })
    async createOption(
        @Body() dto: CreateOptionDTO,
    ): Promise<OptionEntity> {
        return this.optionService.createOption(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'update option' })
    async updateOption(
        @Param('id') id: number,
        @Body() dto: UpdateOptionDTO,
    ): Promise<OptionEntity> {
        return await this.optionService.updateOption(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'delete option' })
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async deleteOption(@Param('id') id: number) {
        return await this.optionService.deleteOption(id);
    }
}
