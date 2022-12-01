import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Unprotected, Roles, RoleGuard } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.services';
import { RequestPayload } from 'src/decorator/request-payload.decorator';
import { USER_ROLE } from 'src/common/enums/user-role.enum';

@ApiTags('Auth Apis')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'api login to med-app' })
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.getAcessToken(loginDTO);
  }

  @Post('getRefreshToken')
  @ApiOperation({ summary: 'get refresh token' })
  @Unprotected()
  async getRefreshToken(@Body() loginDTO: LoginDTO) {
    return this.authService.getRefreshToken(loginDTO);
  }

  @Put('password')
  @Unprotected()
  changePassword() {
    return this.authService.changePassword();
  }

  @Post(':userId')
  @Unprotected()
  @ApiOperation({ summary: 'api logut of med-app' })
  logout(@Param('userId') userId: string, @RequestPayload() token: string) {
    return this.authService.logout(userId, token);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'verify email' })
  @Roles({
    roles: [USER_ROLE.ADMIN]
  })
  verifyEmail(@Param('userId') userId: string, @RequestPayload() token: string) {
    return this.authService.verifyEmail(userId, token);
  }

  @Put()
  @ApiOperation({ summary: 'forgot password' })
  @Roles({
    roles: [USER_ROLE.ADMIN]
  })
  async forgetPassword(@Param('userId') userId: string, @RequestPayload() token: string) {
    return this.authService.forgetPassword(userId, token);
  }
}
