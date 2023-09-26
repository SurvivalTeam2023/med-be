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
    ParseArrayPipe,
} from '@nestjs/common';

import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { FirebaseAdminService } from './fmc.service';
import SendChatDTO from './dto/sendChat.dto';


@ApiTags('Exercise')
@Controller('exercise')
@ApiBearerAuth()
export default class FMCController {
    constructor(private readonly fmcService: FirebaseAdminService) { }



    @Unprotected()
    @Post()
    @ApiOperation({ summary: 'send chat' })
    async createGenre(@Body() dto: SendChatDTO): Promise<any> {
        return this.fmcService.sendNotification(dto);
    }
}
