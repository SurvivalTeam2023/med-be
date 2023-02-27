/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import { AudioGenreService } from './audioGenre.service';
import { AudioGenreEntity } from './entities/audioGenre.entities';

@ApiTags('audioGenre')
@Controller('audio_genre')
@ApiBearerAuth()
@Controller('rest/audio_genre')
export class AudioGenreController {
  constructor(private readonly audioGenreService: AudioGenreService) {}

  @ApiOperation({ summary: 'find Favorite by genreId' })
  @Get(':genreId')
  @Unprotected()
  async getAllFavorite(
    @Param('genreId') genreId: number,
  ): Promise<AudioGenreEntity[]> {
    return this.audioGenreService.findAudioGenre(genreId);
  }
}
