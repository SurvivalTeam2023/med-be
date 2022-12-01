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
  userService: any;
  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'api login to med-app' })
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.getAcessToken(loginDTO);
  }

  @Get('password/:id')
  @Roles({roles: [USER_ROLE.ADMIN],})
  changePassword(@Param('id')id:string, @RequestPayload() token: string) {
    return this.authService.changePassword(id,token);
  @Post('getRefreshToken')
  @ApiOperation({ summary: 'get refresh token' })
  @Unprotected()
  async getRefreshToken(@Body() loginDTO: LoginDTO) {
    return this.authService.getRefreshToken(loginDTO);
  }
  }

  @Post(':userId')
  @ApiOperation({ summary: 'api log out' })
  @Unprotected()
  logout(@Param('userId') userId: string, @RequestPayload() token: string) {
    return this.authService.logout(userId, token);
  }


  @Put('forget-password/:id')
  @Roles({roles: [USER_ROLE.ADMIN]})
  async forgetPassword(@Param('id')id:string, @RequestPayload() token: string) {
    return this.authService.forgetPassword(id,token);
  @Put(':userId')
  @ApiOperation({ summary: 'verify email' })
  @Roles({
    roles: [USER_ROLE.ADMIN]
  })
  verifyEmail(@Param('userId') userId: string, @RequestPayload() token: string) {
    return this.authService.verifyEmail(userId, token);
  }
  }
}
