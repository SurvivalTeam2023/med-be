import { Module } from '@nestjs/common';
import { UsersController } from '../users/user.controller';
import { UsersService } from '../users/user.services';
import { HttpModule } from '@nestjs/axios';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080/auth',
      realm: 'med-app',
      clientId: 'med-app',
      secret: 'EwfsGCeuMDHS2At96ftlzZtN6Mz9aY09',
      // Secret key of the client taken from keycloak server
    }),
    HttpModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    // This adds a global level authentication guard,
    // you can also have it scoped
    // if you like.
    //
    // Will return a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    // This adds a global level resource guard, which is permissive.
    // Only controllers annotated with @Resource and
    // methods with @Scopes
    // are handled by this guard.

    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },

    // New in 1.1.0
    // This adds a global level role guard, which is permissive.
    // Used by `@Roles` decorator with the
    // optional `@AllowAnyRole` decorator for allowing any
    // specified role passed.
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthModule {}
