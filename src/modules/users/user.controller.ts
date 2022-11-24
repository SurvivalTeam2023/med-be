import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Unprotected, Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './user.services';
import { LoginDTO } from './dto/login.dto';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('userList')
  @Roles({ roles: ['admin'] })
  findAll() {
    return this.usersService.findAll();
  }

  // @Get('user')
  // @Roles({ roles: ['admin'] })
  // findUserById() {
  //   return this.usersService.findUserById();
  // }

  @Post()
  @ApiBody({ type: CreateUserDTO })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Post('getToken')
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return await this.usersService.getAcessToken(loginDTO);
  }

  @Put('password')
  @Unprotected()
  changePassword() {
    return this.usersService.changePassword();
  }

  @Post('logout')
  logout() {
    return this.usersService.logout();
  }

  @Put('email')
  @Roles({
    roles: ['admin'],
  })
  verifyEmail() {
    return this.usersService.verifyEmail();
  }
}
