import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';
import { USER_ROLE } from 'src/common/enums/user-role.enum';
import { RequestPayload } from 'src/decorator/request-payload.decorator';


@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('userList')
  @ApiOperation({ summary: 'get user list' })
  @Roles({ roles: [USER_ROLE.ADMIN] })
  findAll(@RequestPayload() token: string) {
    return this.userService.findAll(token);
  }

  @Get(':username')
  @ApiOperation({ summary: 'find user by name' })
  @Roles({ roles: [USER_ROLE.ADMIN] })
  findUserByName(@Param('username') username: string, @RequestPayload() token: string) {
    return this.userService.findUserByName(username, token);
  }

  @Unprotected()
  @ApiOperation({ summary: 'create user' })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }
}