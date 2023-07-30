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
  constructor(private readonly recommendationService: RecommendationService) { }

  @Get('user/:id')
  @ApiOperation({ summary: 'get recommendation by userId' })
  @Unprotected()
  async getResultById(@RequestPayload() token: string): Promise<any> {
    return await this.recommendationService.getRecommendationsService(token);
  }

  @Get('mental/:id')
  @ApiOperation({ summary: 'get recommendation by mentalId' })
  @Unprotected()
  async getResultByMentalId(@RequestPayload() token: string): Promise<any> {
    return await this.recommendationService.getRecommendationsByMental(token);
  }

  @Get('audio/:id')
  @ApiOperation({ summary: 'get recommendation by genreId' })
  @Unprotected()
  async getResultByAudioId(@Param('id') genreId: number, @RequestPayload() token: string): Promise<any> {
    return await this.recommendationService.getRecommendationsByAudio(genreId);
  }
}
