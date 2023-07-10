import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import RecommendationService from './recommendations.service';
import { getUserId } from '../../utils/decode.utils';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';

@ApiTags('Recommendation')
@Controller('recommendation')
@ApiBearerAuth()
export default class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':id')
  @ApiOperation({ summary: 'get recommendation by userId' })
  @Unprotected()
  async getResultById(@RequestPayload() token: string): Promise<any> {
    const userId = getUserId(token);
    return await this.recommendationService.getRecommendationsService(userId);
  }
}
