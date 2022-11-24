import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('userList')
  @Roles({ roles: ['admin'] })
  findAll() {
    return this.userService.findAll();
  }

  // @Get('user')
  // @Roles({ roles: ['admin'] })
  // findUserById() {
  //   return this.usersService.findUserById();
  // }

  @Post()
  @ApiBody({ type: CreateUserDTO })
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }
}
