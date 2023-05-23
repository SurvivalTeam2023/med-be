import { Body, Controller, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { CreateArtistDTO } from '../artist/dto/createArtist.dto';
import { LoginGmailDTO } from '../auth/dto/loginGmail.dto';
import { USER_REALM_ROLE } from 'src/common/enums/userRealmRole.enum';
import { USER_STATUS } from 'src/common/enums/userStatus.enum';
import { ErrorHelper } from '../../helpers/error.helper';
import { ERROR_MESSAGE } from '../../common/constants/messages.constant';
import { UpdateUserDTO } from './dto/updateUser.dto';
import UserEntity from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import Avatar from 'antd/lib/avatar/avatar';

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

  @Get(':username')
  @ApiOperation({ summary: 'find user by name' })
  @Unprotected()
  async findUserByName(
    @Param('username') username: string,
    @RequestPayload() token: string,
  ) {
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
  changeUserRoleToArtist(
    @Param('username') username: string,
    @Query('role') role: USER_REALM_ROLE,
  ) {
    return this.userService.changeRole(
      username,
      USER_REALM_ROLE.APP_USER,
      role,
    );
  }

  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'update user status' })
  @Patch(':username')
  async updateUserStatus(
    @Param('username') username: string,
    @RequestPayload() token: string
  ): Promise<UserEntity> {
    return await this.userService.updateUserStatus(
      username,
      token,
    );
  }
  @Roles({ roles: [USER_CLIENT_ROLE.ADMIN] })
  @ApiOperation({ summary: 'get number of user' })
  @ApiQuery({ name: 'status', enum: USER_STATUS, required: false, })
  @Get()
  async getCountUser(@Query('status') status: USER_STATUS): Promise<number> {
    return await this.userService.countUser(status)
  }


  @Unprotected()
  @Get('getProfile/:userId')
  async getUserProfile(@Param('userId') userId: string): Promise<any> {
    return await this.userService.getUserProfile(userId)
  }

  @Roles({ roles: [USER_CLIENT_ROLE.USER, USER_CLIENT_ROLE.SUBSCRIBER] })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @Put(':userId')
  async updateUser(@Body() dto: UpdateUserDTO, @UploadedFile() avatar: Express.Multer.File, @RequestPayload() token: string): Promise<UserEntity> {
    return await this.userService.updateUser(token, dto, avatar)
  }

}
