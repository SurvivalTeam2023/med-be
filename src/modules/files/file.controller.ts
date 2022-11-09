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
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDto } from './dto/file.dto';
import { FilesService } from './files.service';

@ApiTags('upload')
@Controller('upload')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post('/files')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload image to with file extension jpg or png',
    type: FileDto,
  })
  async uploadFile(
    @Body() body: FileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.uploadPublicFile(file.buffer, file.originalname);
  }

  @Get('files')
  async getAllFiles(@Request() request: any) {
    return this.fileService.generatePresignedUrl(request);
  }
}
