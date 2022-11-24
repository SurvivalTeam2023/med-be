import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileQuery } from './dto/file-query.dto';
import { FileDTO } from './dto/file.dto';
import { FilesService } from './files.service';
import { PublicFile } from './publicFile.entity';

@ApiTags('upload')
@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('/files')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image to with file extension jpg or png',
    type: PublicFile,
  })
  async uploadFile(
    @Body() body: FileDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadPublicFile(file.buffer, file.originalname);
  }

  @Get('file')
  async getFiles(@Query() query: FileQuery) {
    console.log('queyr', query);
    return this.fileService.getFile(query.id, query.key);
  }

  @Get('files')
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}