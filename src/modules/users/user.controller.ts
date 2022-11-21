import { Body, Controller, Get, Param, Post, Req, Put, Query } from '@nestjs/common';
import { ApiBody, ApiTags, SwaggerModule } from '@nestjs/swagger';
import { CreateAccessToken } from './dto/create-access-token.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './user.services';


@ApiTags('Users')
@Controller('user')

export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Post()
  @ApiBody({ type: CreateUserDTO })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Post('token')
  getAccessToken(@Body() createAccessToken: CreateAccessToken) {
    return this.usersService.getAcessToken(createAccessToken);
  }

  @Put()
  verifyEmail() {
    return this.usersService.verifyEmail();
  }
}