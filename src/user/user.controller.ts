/* eslint-disable prettier/prettier */
import { Controller, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Send-mail')
@Controller('Send-mail')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put()
  async forgetPassword() {
    return this.userService.forgetPassword();
  }
}
