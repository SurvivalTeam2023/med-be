import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
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
    ParseIntPipe
} from '@nestjs/common';
import { Roles } from "nest-keycloak-connect";
import { USER_CLIENT_ROLE } from "src/common/enums/userClientRole.enum";
import SubscriptionService from "./subscription.services";
import { SubscriptionEntity } from "./entities/subscription.entity";
import SearchSubscriptionDTO from "./dto/searchSubscription.dto";
import { Pagination } from "nestjs-typeorm-paginate";
import CreateSubscriptionDTO from "./dto/createSubscription.dto";
import UpdateSubscriptionDTO from "./dto/updateSubscription.dto";


@ApiTags('Subscriptions')
@Controller('subscriptions')
@ApiBearerAuth()
export default class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async getSubscriptionById(@Param('id') id: number): Promise<SubscriptionEntity> {
        return this.subscriptionService.findSubscriptionById(id);
    }

    @Get()
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @ApiQuery({
        name: "page",
        required: false
      })
      @ApiQuery({
        name: "limit",
        required: false
      })
    async getSubcriptions(
        @Query() subscription: SearchSubscriptionDTO,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<SubscriptionEntity>> {
        limit = limit > 100 ? 100 : limit;
        return this.subscriptionService.findSubscriptions(
            subscription, {
            page,
            limit,
        },
        );
    }

    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    @Post()
    async createSubscription(@Body() dto: CreateSubscriptionDTO): Promise<SubscriptionEntity> {
        return this.subscriptionService.createSubscription(dto);
    }


    @Put(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async updateSubscription(
        @Param('id') id: number,
        @Body() updateSubscriptionDTO: UpdateSubscriptionDTO,
    ): Promise<SubscriptionEntity> {
        return await this.subscriptionService.updateSubscription(id, updateSubscriptionDTO);
    }

    @Delete(':id')
    @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
    async deleteSubscription(@Param('id') id: number) {
        return await this.subscriptionService.deleteSubscription(id);
    }
}