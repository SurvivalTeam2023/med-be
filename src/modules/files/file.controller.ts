import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileQuery } from './dto/file-query.dto';
import { PublicFile } from './dto/publicFile.dto';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { AudioFileDTO } from './dto/audiFile.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly fileService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'upload file' })
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  // @Unprotected()
  @ApiBody({
    description: 'Upload image to with file extension jpg or png',
    type: PublicFile,
  })
  async uploadFile(
    @Body() body: FileEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadPublicFile(file.buffer, file.originalname);
  }

  @Post('audio')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'upload audio file' })
  @Roles({ roles: [USER_CLIENT_ROLE.ARTIST, USER_CLIENT_ROLE.ADMIN] })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1, },
      { name: 'image', maxCount: 1 },
    ],),
  )
  async uploadAudioFile(

    @UploadedFiles() files: { audio?: Express.Multer.File[], image?: Express.Multer.File[] },
    @Body() body: AudioFileDTO,
  ) {

    return await this.fileService.uploadAudio(files.audio[0], files.image[0])
  }


  @Get('id')
  @Unprotected()
  @ApiOperation({ summary: 'get file' })
  async getFiles(@Param() query: FileQuery) {
    return this.fileService.getFile(query.id);
  }

  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'get file by id' })
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}
