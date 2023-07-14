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
    const userId = "a582937b-f5a4-45cb-be6a-51ee41bcdc84";
    return await this.recommendationService.getRecommendationsService(userId);
  }

  @Get('genre/:id')
  @ApiOperation({ summary: 'get recommendation by genreId' })
  @Unprotected()
  async getResultByGenreId(@Param('id') genreId: number, @RequestPayload() token: string): Promise<any> {
    const userId = "a582937b-f5a4-45cb-be6a-51ee41bcdc84";
    return await this.recommendationService.getRecommendationsByGenre(genreId);
  }

  @Get('audio/:id')
  @ApiOperation({ summary: 'get recommendation by genreId' })
  @Unprotected()
  async getResultByAudioId(@Param('id') genreId: number, @RequestPayload() token: string): Promise<any> {
    const userId = "a582937b-f5a4-45cb-be6a-51ee41bcdc84";
    return await this.recommendationService.getRecommendationsByAudio(genreId);
  }
}
