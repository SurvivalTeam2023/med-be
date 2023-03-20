import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileQuery } from './dto/file-query.dto';
import { PublicFile } from './dto/publicFile.dto';
import { FileEntity } from './entities/file.entity';
import { FilesService } from './files.service';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';

@ApiTags('Files')
@Controller('files')
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly fileService: FilesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
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

  @Get('id')
  @Unprotected()
  async getFiles(@Param() query: FileQuery) {
    return this.fileService.getFile(query.id);
  }

  @Get()
  @Unprotected()
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }
}
