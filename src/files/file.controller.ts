import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file.dto';
import { FilesService } from './files.service';

@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('/files')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: FileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log('file', file);
    return this.fileService.uploadPublicFile(file.buffer, file.originalname);
  }

  @Get('files')
  async getAllFiles(@Request() request: any) {
    return this.fileService.generatePresignedUrl(request);
  }
}
