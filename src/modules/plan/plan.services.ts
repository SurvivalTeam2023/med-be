/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { Repository } from 'typeorm';
import { PlanEntity } from './entities/plan.entity';
import SearchPlanDTO from './dto/findPlan.dto';
import CreatePlanDTO from './dto/createPlan.dto';
import UpdatePlanDTO from './dto/updatePlan.dto';
import { PlanStatus } from 'src/common/enums/planStatus.enum';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PRODUCT_ID } from 'src/environments';


@Injectable()
export default class PlanService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(PlanEntity)
    private readonly planRepo: Repository<PlanEntity>,
  ) { }

  async findPlanById(
    planId: string,
  ): Promise<PlanEntity> {
    const subcription = await this.planRepo
      .createQueryBuilder('plan')
      .where('plan.id = :planId', {
        planId,
      })
      .getOne();
    if (!subcription) {
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAN.NOT_FOUND);
    }
    return subcription;
  }

  async findSubscriptionTypes(dto: SearchPlanDTO): Promise<PlanEntity[]> {
    const querybuilder = this.planRepo
      .createQueryBuilder('plan')
    console.log(dto.usageTime, "time")
    if (dto.name) querybuilder.where('plan.name like :name', { name: `%${dto.name}%` }).orderBy('subscription_type.created_at', 'DESC')
    if (dto.status) querybuilder.andWhere('plan.status like :status', { status: dto.status }).orderBy('subscription_type.created_at', 'DESC')
    if (dto.usageTime) querybuilder.andWhere('plan.usage_time = :usageTime', { usageTime: dto.usageTime }).orderBy('subscription_type.created_at', 'DESC')

    return querybuilder.getMany();
  }

  async createSubscriptionType(
    dto: CreatePlanDTO,
  ): Promise<PlanEntity> {
    const planPayPal = await lastValueFrom(
      this.httpService.post(
        `https://api-m.sandbox.paypal.com/v1/billing/plans`,
        {
          product_id: PRODUCT_ID,
          name: dto.name,
          description: dto.desc,
          billing_cycles: [
            {
              frequency: {
                interval_unit: "MONTH",
                interval_count: dto.usageTime
              },
              tenure_type: "REGULAR",
              sequence: 1,
              total_cycles: 0,
              pricing_scheme: {
                fixed_price: {
                  value: dto.cost,
                  currency_code: "USD"
                }
              }
            }
          ],
          payment_preferences: {
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer A21AALZzzOriCavdC3qD-d2yz0S2Msl4hIjxN9v2Upro8TpT19NyiP0O8Og60EyxRsQg-OYJyLQ_xgdZs8l5tDBYsCw6aAJYA',
          }
        }
      )
        .pipe(map((response) => response.data)),
    ).catch((err) => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage);
    });
    const plan = await this.planRepo.save({
      id: planPayPal.id,
      ...dto,
    });
    return plan;
  }
  async updatePlan(
    planId: string,
    dto: UpdatePlanDTO,
  ): Promise<PlanEntity> {
    const subcription = await this.findPlanById(planId);
    if (!subcription)
      ErrorHelper.NotFoundExeption(ERROR_MESSAGE.PLAN.NOT_FOUND);

    const updatedSubcription = await this.planRepo.save({
      id: subcription.id,
      ...dto,
    });
    return updatedSubcription;
  }

  async deletePlan(
    subscriptionTypeId: string,
  ): Promise<PlanEntity> {
    const subsciptionType = await this.findPlanById(
      subscriptionTypeId,
    );
    if (subsciptionType) {
      subsciptionType.status = PlanStatus.INACTIVE;
      await this.planRepo.save(subsciptionType);
    }
    return subsciptionType;
  }
}
