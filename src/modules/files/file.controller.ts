import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileEntity } from './entities/file.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileQuery } from './dto/file-query.dto';
import { FilesService } from './files.service';
import { PublicFile } from './dto/publicFile.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
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

  @Get('id')
  async getFiles(@Query() query: FileQuery) {
    return this.fileService.getFile(query.id, query.key);
  }

  @Get()
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}
