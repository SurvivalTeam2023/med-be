import { Body, Controller, Get, Param, Post, Req, Put, Query } from '@nestjs/common';
import { Unprotected, Roles, Public } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiTags, SwaggerModule } from '@nestjs/swagger';
// import { CreateAccessToken } from './dto/create-access-token.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import { UsersService } from './user.services';
import { LoginDTO } from './dto/login.dto';
import { AccessToken } from './dto/createAccessToken.dto';


@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get('userList')
  @Roles({ roles: ['admin'] })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateUserDTO })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Post('getToken')
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return await this.usersService.getAcessToken(loginDTO)

  }


  @Put('email')
  @Roles({
    roles: ['admin'],
  })
  verifyEmail() {
    return this.usersService.verifyEmail();
  }
}