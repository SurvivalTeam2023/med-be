import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles, Unprotected } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.services';
import { RequestPayload } from 'src/decorator/request-payload.decorator';
import { USER_CLIENT_ROLE } from 'src/common/enums/user-client-role.enum';
import { CreateArtistDTO } from '../artist/dto/createArtist.dto';
import { LoginGmailDTO } from '../auth/dto/loginGmail.dto';

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
  @ApiOperation({ summary: 'sign in with Google' })
  @ApiBody({ type: LoginGmailDTO })
  @Post('google')
  signInGoogle(@Body() LoginGmailDTO: LoginGmailDTO) {
    return this.userService.signInGoogle(LoginGmailDTO);
  }
}