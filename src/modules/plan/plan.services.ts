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
import { lastValueFrom, map, of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { PAYPAL_PRODUCT_ID, PAYPAL_URL } from 'src/environments';
import { AuthService } from '../auth/auth.services';

@Injectable()
export default class PlanService {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    @InjectRepository(PlanEntity)
    private readonly planRepo: Repository<PlanEntity>,
  ) {}

  async findPlanById(planId: string): Promise<PlanEntity> {
    const subscription = await this.planRepo
      .createQueryBuilder('plan')
      .where('plan.id = :planId', {
        planId,
      })
      .getOne();
    if (!subscription) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAN.NOT_FOUND);
    }
    return subscription;
  }

  async findPlan(dto: SearchPlanDTO): Promise<PlanEntity[]> {
    const queryBuilder = this.planRepo.createQueryBuilder('plan');
    if (dto.name)
      queryBuilder
        .where('LOWER(plan.name) like :name', { name: `%${dto.name}%` })
        .orderBy('plan.created_at', 'DESC');
    if (dto.status)
      queryBuilder
        .andWhere('plan.status like :status', { status: dto.status })
        .orderBy('plan.created_at', 'DESC');
    if (dto.usageTime)
      queryBuilder
        .andWhere('plan.usage_time = :usageTime', { usageTime: dto.usageTime })
        .orderBy('plan.created_at', 'DESC');

    return queryBuilder.getMany();
  }

  async createPlan(dto: CreatePlanDTO): Promise<PlanEntity> {
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    const planPayPal = await lastValueFrom(
      this.httpService
        .post(
          `${PAYPAL_URL}/v1/billing/plans`,
          {
            product_id: PAYPAL_PRODUCT_ID,
            name: dto.name,
            description: dto.desc,
            billing_cycles: [
              {
                frequency: {
                  interval_unit: 'MONTH',
                  interval_count: dto.usageTime,
                },
                tenure_type: 'REGULAR',
                sequence: 1,
                total_cycles: 0,
                pricing_scheme: {
                  fixed_price: {
                    value: dto.cost,
                    currency_code: 'USD',
                  },
                },
              },
            ],
            payment_preferences: {
              setup_fee_failure_action: 'CONTINUE',
              payment_failure_threshold: 3,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: token,
            },
          },
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
  async updatePlan(planId: string, dto: UpdatePlanDTO): Promise<PlanEntity> {
    const subcription = await this.findPlanById(planId);
    if (!subcription)
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAN.NOT_FOUND);

    const updatedSubcription = await this.planRepo.save({
      id: subcription.id,
      ...dto,
    });
    return updatedSubcription;
  }

  async deactivatePlan(planId: string): Promise<PlanEntity> {
    const plan = await this.findPlanById(planId);
    if (!plan) {
      ErrorHelper.NotFoundException(ERROR_MESSAGE.PLAN.NOT_FOUND);
    }
    const response = await lastValueFrom(
      this.authService.getPayPalAccessToken(),
    );
    let token = `Bearer ${response['access_token']}`;
    await lastValueFrom(
      this.httpService
        .post(
          `${PAYPAL_URL}/v1/billing/plans/${planId}/deactivate`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          },
        )
        .pipe(map((response) => response.data)),
    ).catch((err) => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage);
    });
    plan.status = PlanStatus.INACTIVE;
    await this.planRepo.save(plan);
    return plan;
  }
}
