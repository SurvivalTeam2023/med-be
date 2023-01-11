/* eslint-disable prettier/prettier */
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
import { Roles } from 'nest-keycloak-connect';
import SubscriptionTypeService from './subscriptionType.services';
import { SubscriptionTypeEntity } from './entities/subscriptionType.entity';
import CreateSubscriptionTypeDTO from './dto/createSubscriptionType.dto';
import UpdateSubscriptionTypeDTO from './dto/updateSubscriptionType.dto';
import { USER_REALM_ROLE } from 'src/common/enums/userRealmRole.enum';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';

@ApiTags('SubscriptionTypes')
@Controller('subscriptionTypes')
@ApiBearerAuth()
export default class SubscriptionTypeController {
  constructor(
    private readonly subscriptionTypeService: SubscriptionTypeService,
  ) {}

  @Get(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async getSubscriptionTypeById(
    @Param('id') id: number,
  ): Promise<SubscriptionTypeEntity> {
    return this.subscriptionTypeService.findSubscriptionTypeById(id);
  }

  @Get()
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async getSubcriptionTypes(
    @Query() name: string,
  ): Promise<SubscriptionTypeEntity[]> {
    return this.subscriptionTypeService.findSubscriptionTypes(name);
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
