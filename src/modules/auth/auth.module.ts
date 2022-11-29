import { Module } from '@nestjs/common';
import { KeycloakModule } from 'src/common/config/keycloak.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [KeycloakModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
