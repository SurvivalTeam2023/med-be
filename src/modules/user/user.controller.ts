
import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {  UserService } from './user.services';
import { LoginDTO } from './dto/login.dto';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Put('password')
  async changePassword() {
    return this.userService.changePassword();
  }
  @Post('getToken')
  async login(@Body() loginDTO: LoginDTO) {
    return this.userService.getAcessToken(loginDTO)

  }
}
