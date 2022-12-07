import { forwardRef, Module } from '@nestjs/common';
import { KeycloakModule } from 'src/common/config/keycloak.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from '../user/user.module';
@Module({
  imports: [KeycloakModule, HttpModule, forwardRef(() => UserModule)],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }