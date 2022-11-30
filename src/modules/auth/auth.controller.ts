import { Body, Controller, Post, Put, Param } from '@nestjs/common';
import { Unprotected, Roles } from 'nest-keycloak-connect';
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

  @Post('getToken')
  @ApiOperation({ summary: 'api login to med-app' })
  @Unprotected()
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.getAcessToken(loginDTO);
  }

  @Put('password/:id')
  @Roles({roles: [USER_ROLE.ADMIN],})
  changePassword(@Param('id')id:string, @RequestPayload() token: string) {
    return this.authService.changePassword(id,token);
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
