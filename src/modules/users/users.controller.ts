import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    description: 'Upload image to with file extension jpg or png',
    type: CreateUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 2000 }),
    //       new FileTypeValidator({ fileType: 'image/*' }),
    //     ],
    //   }),
    // )
    // file: Express.Multer.File,
  ): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  // @Post('avatar')
  // @UseInterceptors(FileInterceptor('file'))
  // async addAvatar(
  //   @Req() request: RequestWithUser,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.usersService.addAvatar(
  //     request.user.id,
  //     file.buffer,
  //     file.originalname,
  //   );
  // }
}
