import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';
import { RequestPayload } from 'src/decorator/request-payload.decorator';
import { USER_CLIENT_ROLE } from 'src/common/enums/user-client-role.enum';
import { CreateArtistDTO } from '../artist/dto/createArtist.dto';
import { USER_REALM_ROLE } from 'src/common/enums/user-realm-role.enum';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('userList')
  @ApiOperation({ summary: 'get user list' })

  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  getUserList(@RequestPayload() token: string) {
    return this.userService.getUserList(token);
  }

  @Unprotected()
  @ApiOperation({ summary: 'create user' })
  @ApiBody({ type: CreateUserDTO })
  @Post('user')
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Unprotected()
  @ApiOperation({ summary: 'create artist' })
  @ApiBody({ type: CreateArtistDTO })
  @Post('artist')
  createArtist(@Body() createArtistDTO: CreateArtistDTO) {
    return this.userService.createArtist(createArtistDTO);
  }

  @Unprotected()
  @ApiOperation({ summary: 'change user role to artist' })
  @ApiQuery({ name: 'role', enum: USER_REALM_ROLE })
  @Put(':username/role')
  changeUserRoleToArtist(@Param('username') username:string , @Query('role') role: USER_REALM_ROLE) {
    return this.userService.changeRole(username,USER_REALM_ROLE.APP_USER,role);
  }
}