
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
import QuestionService from './question.service';
import { QuestionEntity } from './entities/question.entity';
import SearchQuestionDTO from './dto/searchQuestion.dto';
import UpdateQuestionDTO from './dto/updateQuestion.dto';
import CreateQuestionDTO from './dto/createQuestion.dto';

@ApiTags('Questions')
@Controller('question')
@ApiBearerAuth()
export default class QuestionController {
    constructor(private readonly questionService: QuestionService) { }

    @Get(':id')
    @Unprotected()
    @ApiOperation({ summary: 'get question by id ' })

    async findQuestionById(@Param('id') id: number): Promise<QuestionEntity> {
        return this.questionService.findQuestionById(id);
    }

    @Get()
    @Unprotected()
    @ApiOperation({ summary: 'get question list ' })

    @ApiQuery({
        name: 'page',
        required: false,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
    })
    async findQuestions(
        @Query() question: SearchQuestionDTO,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<QuestionEntity>> {
        limit = limit > 100 ? 100 : limit;
        return this.questionService.findQuestions(question, {
            page,
            limit,
        });
    }

    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @Post()
    @ApiOperation({ summary: 'create question' })

    async createQuestion(
        @Body() dto: CreateQuestionDTO,
    ): Promise<QuestionEntity> {
        return this.questionService.createQuestion(dto);
    }

    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiOperation({ summary: 'update question ' })
    async updateQuestion(
        @Param('id') id: number,
        @Body() dto: UpdateQuestionDTO,
    ): Promise<QuestionEntity> {
        return await this.questionService.updateQuestion(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'update question ' })
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async deleteQuestion(@Param('id') id: number) {
        return await this.questionService.deleteQuestion(id);
    }
}
