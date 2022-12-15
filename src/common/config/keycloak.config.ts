import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRECT, KEYCLOAK_HOST } from 'src/environments';
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: `${KEYCLOAK_HOST}/auth`,
      realm: 'med-app',
      clientId: KEYCLOAK_CLIENT_ID,
      secret: KEYCLOAK_CLIENT_SECRECT,
    }),
    HttpModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class KeycloakModule {}
