/* eslint-disable prettier/prettier */
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import SubscriptionTypeService from './subscriptionType.services';
import { SubscriptionTypeEntity } from './entities/subscriptionType.entity';
import CreateSubscriptionTypeDTO from './dto/createSubscriptionType.dto';
import UpdateSubscriptionTypeDTO from './dto/updateSubscriptionType.dto';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import SearchSubscriptionTypeDTO from './dto/findSubscriptionType.dto';

@ApiTags('SubscriptionTypes')
@Controller('subscriptionTypes')
@ApiBearerAuth()
export default class SubscriptionTypeController {
  constructor(
    private readonly subscriptionTypeService: SubscriptionTypeService,
  ) { }

  @Get(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async getSubscriptionTypeById(
    @Param('id') id: number,
  ): Promise<SubscriptionTypeEntity> {
    return this.subscriptionTypeService.findSubscriptionTypeById(id);
  }

  @Get()
  @Unprotected()
  async getSubcriptionTypes(
    @Query() dto: SearchSubscriptionTypeDTO,
  ): Promise<SubscriptionTypeEntity[]> {
    console.log('time', dto.usageTime)
    return this.subscriptionTypeService.findSubscriptionTypes(dto);
  }

  @Post()
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async createSubscriptionType(
    @Body() dto: CreateSubscriptionTypeDTO,
  ): Promise<SubscriptionTypeEntity> {
    return this.subscriptionTypeService.createSubscriptionType(dto);
  }

  @Put(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async updateSubscriptionType(
    @Param('id') id: number,
    @Body() updateSubscriptionDTO: UpdateSubscriptionTypeDTO,
  ): Promise<SubscriptionTypeEntity> {
    return await this.subscriptionTypeService.updateSubscriptionType(
      id,
      updateSubscriptionDTO,
    );
  }

  @Delete(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async deleteSubscription(@Param('id') id: number) {
    return await this.subscriptionTypeService.deleteSubscriptionType(id);
  }
}
