import { Body, Controller, Post, Put } from '@nestjs/common';
import { Unprotected, Roles } from 'nest-keycloak-connect';
import { ApiBearerAuth, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.services';

@ApiTags('Auth Apis')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('getToken')
  @ApiOperation({ summary: 'api login to med-app' })
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.getAcessToken(loginDTO);
  }

  @Post('getToken')
  @ApiOperation({ summary: 'api login to med-app' })
  @Unprotected()
  async getRefreshToken(@Body() loginDTO: LoginDTO) {
    return this.authService.getRefreshToken(loginDTO);
  }

  @Put('password')
  @Unprotected()
  changePassword() {
    return this.authService.changePassword();
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Put('email')
  @Roles({
    roles: ['admin'],
  })
  verifyEmail() {
    return this.authService.verifyEmail();
  }

  @Put()
  async forgetPassword() {
    return this.authService.forgetPassword();
  }
}
