import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Unprotected, Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.services';
import { RequestPayload } from 'src/decorator/requestPayload.decorator';
import { USER_CLIENT_ROLE } from 'src/common/enums/userClientRole.enum';
import { LoginGmailDTO } from './dto/loginGmail.dto';
import { firstValueFrom, Observable, of } from 'rxjs';


@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login/token')
  @ApiOperation({ summary: 'api login to med-app' })
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.getAcessToken(loginDTO);
  }

  @Post('google')
  @ApiOperation({ summary: 'google' })
  @Unprotected()
  async getAccessWithGoogle(@Body() loginGmailDTO: LoginGmailDTO) {
    return this.authService.getAccessWithGoogle(loginGmailDTO);
  }

  @Get('change-password/:username')
  @ApiOperation({ summary: 'change password for user' })
  @Unprotected()
  changePassword(@Param('username') username: string) {
    return this.authService.changePassword(username);
  }

  @Post('refreshToken')
  @ApiOperation({ summary: 'get refresh token' })
  @Unprotected()
  async getRefreshToken(@Body() loginDTO: LoginDTO) {
    return this.authService.getRefreshToken(loginDTO);
  }

  @Post(':username')
  @ApiOperation({ summary: 'api log out' })
  @Unprotected()
  logout(@Param('username') username: string, @RequestPayload() token: string) {
    return this.authService.logout(username, token);
  }

  @Put(':username')
  @ApiOperation({ summary: 'verify email' })
  @Unprotected()
  verifyEmail(@Param('username') username: string) {
    return this.authService.verifyEmail(username);
  }

  @Put()
  @ApiOperation({ summary: 'forgot password' })
  @Unprotected()
  async forgetPassword(@Param('username') username: string) {
    return this.authService.forgetPassword(username);
  }
}
