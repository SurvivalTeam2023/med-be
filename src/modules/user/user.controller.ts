import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('userList')
  @Roles({ roles: ['admin'] })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':username')
  @Roles({ roles: ['admin'] })
  findUserByName(@Param('username') username: string) {
    return this.userService.findUserByName(username);
  }

  @Post()
  @Roles({ roles: ['admin'] })
  @ApiBody({ type: CreateUserDTO })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }
}
