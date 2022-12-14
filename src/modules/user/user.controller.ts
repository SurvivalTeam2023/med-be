import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { CreateArtistDTO } from '../artist/dto/createArtist.dto';
import { LoginGmailDTO } from '../auth/dto/loginGmail.dto';
import { USER_REALM_ROLE } from 'src/common/enums/userRealmRole.enum';

@ApiTags('Users')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('userList')
  @ApiOperation({ summary: 'get user list' })
  @Roles({ roles: [USER_REALM_ROLE.APP_ADMIN] })
  getUserList(@RequestPayload() token: string) {
    return this.userService.getUserList(token);
  }




  @Get('userName')
  @ApiOperation({ summary: 'find user by name' })
  @Roles({ roles: [USER_CLIENT_ROLE.USER] })
  findUserByName(@Param('username') username: string, @RequestPayload() token: string, ) {
    return this.userService.findUserByName(username, token);
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
  @ApiOperation({ summary: 'sign in with Google' })
  @ApiBody({ type: LoginGmailDTO })
  @Post('google')
  signInGoogle(@Body() LoginGmailDTO: LoginGmailDTO) {
    return this.userService.signInGoogle(LoginGmailDTO);
  }

  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'change user role to artist' })
  @ApiQuery({ name: 'role', enum: USER_REALM_ROLE })
  @Put(':username/role')
  changeUserRoleToArtist(@Param('username') username: string, @Query('role') role: USER_REALM_ROLE) {
    return this.userService.changeRole(username, USER_REALM_ROLE.APP_USER, role);
  }
}