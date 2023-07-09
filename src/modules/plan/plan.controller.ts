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
  Query,
} from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import PlanService from './plan.services';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { PlanEntity } from './entities/plan.entity';
import SearchPlanDTO from './dto/findPlan.dto';
import CreatePlanDTO from './dto/createPlan.dto';
import UpdatePlanDTO from './dto/updatePlan.dto';

@ApiTags('Plans')
@Controller('plans')
@ApiBearerAuth()
export default class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'get plan by id' })
  async getPlanById(@Param('id') id: string): Promise<PlanEntity> {
    return this.planService.findPlanById(id);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'get plan list' })
  async getPlans(@Query() dto: SearchPlanDTO): Promise<PlanEntity[]> {
    return this.planService.findPlan(dto);
  }

  @Post()
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'create plan' })
  async createPlan(@Body() dto: CreatePlanDTO): Promise<PlanEntity> {
    return this.planService.createPlan(dto);
  }

  @Put(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'update plan' })
  async updatePlan(
    @Param('id') id: string,
    @Body() updateSubscriptionDTO: UpdatePlanDTO,
  ): Promise<PlanEntity> {
    return await this.planService.updatePlan(id, updateSubscriptionDTO);
  }

  @Delete(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'delete plan' })
  async deactivatePlan(@Param('id') id: string) {
    return await this.planService.deactivatePlan(id);
  }
}
