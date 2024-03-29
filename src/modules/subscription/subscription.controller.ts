/* eslint-disable @typescript-eslint/no-inferrable-types */
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
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import SubscriptionService from './subscription.services';
import { SubscriptionEntity } from './entities/subscription.entity';
import SearchSubscriptionDTO from './dto/searchSubscription.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import CreateSubscriptionDTO from './dto/createSubscription.dto';
import UpdateSubscriptionDTO from './dto/updateSubscription.dto';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';

@ApiTags('Subscriptions')
@Controller('subscriptions')
@ApiBearerAuth()
export default class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Get(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async getSubscriptionById(
    @Param('id') id: string,
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.findSubscriptionById(id);
  }

  @Get()
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  async getSubscriptions(
    @Query() subscription: SearchSubscriptionDTO,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<SubscriptionEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.subscriptionService.findSubscriptions(subscription, {
      page,
      limit,
    });
  }

  @Roles({ roles: [USER_CLIENT_ROLE.USER] })
  @ApiOperation({ summary: 'create subscription' })
  @Post()
  async createSubscription(
    @Body() dto: CreateSubscriptionDTO,
    @RequestPayload() token: string,
  ): Promise<any> {
    return this.subscriptionService.createSubscription(dto, token);
  }
  @Post(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.USER] })
  @ApiOperation({ summary: 'activate subscription' })
  async activateSubscription(
    @Param('id') id: string,
    @RequestPayload() token: string,
  ) {
    return this.subscriptionService.activateSubscription(id, token);
  }
  @Put(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  async updateSubscription(
    @Param('id') id: string,
    @Body() updateSubscriptionDTO: UpdateSubscriptionDTO,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionService.updateSubscription(
      id,
      updateSubscriptionDTO,
    );
  }

  @Delete(':id')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'suspend subscription' })
  async suspendSubscription(@Param('id') id: string) {
    return await this.subscriptionService.suspendSubscription(id);
  }
  @Get('/user/userID')
  @Roles({ roles: [USER_CLIENT_ROLE.USER] })
  @ApiOperation({
    description: 'get subscription list by userID and update status',
  })
  async getSubscriptionByUserId(
    @RequestPayload() token: string,
  ): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.getSubscriptionByUserId(token);
  }

  @Get('user/count')
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({
    description: 'get total number of user subscribe',
  })
  async countUserSubscribe(
    ): Promise<number> {
    return this.subscriptionService.countUserSubscribe();
  }
}
