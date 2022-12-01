import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRECT,
  KEYCLOAK_HOST,
  KEYCLOAK_REALM_ClIENT,
  REALM_PRODUCTION,
} from 'src/environments';
import { LoginDTO } from './dto/login.dto';
import { UserDTO } from './dto/user.dto';
import { TokenDTO } from './dto/token.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { RequiredAction } from 'src/common/enums/user-action.enum';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  logout(userId: string, token: string | null): Observable<AxiosResponse<[UserDTO]>> {
    return this.httpService
      .post(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${userId}/logout`, {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        },
      ).pipe(map((response) => response.data))
      .pipe(catchError(err =>
        of(ErrorHelper.UnAuthorizeException(ERROR_MESSAGE.KEY_CLOAK.UNAUTHORIZED))
      ));
  }

  getAcessToken(loginDTO: LoginDTO): Observable<AxiosResponse<TokenDTO[]>> {
    const form = new URLSearchParams();
    form.append('username', loginDTO.username);
    form.append('password', loginDTO.password);
    form.append('grant_type', 'password');
    form.append('client_id', `${KEYCLOAK_CLIENT_ID}`);
    form.append('client_secret', `${KEYCLOAK_CLIENT_SECRECT}`);
    form.append('scope', 'openid');
    return this.httpService
      .post(
        `http://${KEYCLOAK_HOST}:8080/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
        form,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(catchError(err =>
        of(ErrorHelper.BadRequestException(ERROR_MESSAGE.KEY_CLOAK.NOT_VERIFY_EMAIL))
      ));
  }

  getRefreshToken(loginDTO: LoginDTO): Observable<AxiosResponse<TokenDTO[]>> {
    const form = new URLSearchParams();
    form.append('username', loginDTO.username);
    form.append('password', loginDTO.password);
    form.append('grant_type', 'password');
    form.append('client_id', `${KEYCLOAK_CLIENT_ID}`);
    form.append('client_secret', `${KEYCLOAK_CLIENT_SECRECT}`);
    form.append('scope', 'openid');
    return this.httpService
      .post(
        `http://${KEYCLOAK_HOST}:8080/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
        form,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((response) => response.data.refresh_token))
      .pipe(catchError(err =>
        of(ErrorHelper.BadGatewayException(err.response.data.errorMessage))
      ));
  }
  changePassword(id: string, token?: string | null): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${id}/execute-actions-email`,
        [RequiredAction.UPDATE_PASSWORD],
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
        },
      )
      .pipe(map((response) => response.data)).pipe(
        catchError(err =>
          of(ErrorHelper.BadGatewayException(err.response.data.errorMessage)
          ))
      );
  }

  verifyEmail(userId: string, token: string): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${userId}/execute-actions-email`,

        [RequiredAction.VERIFY_EMAIL],

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(catchError(err =>
        of(ErrorHelper.BadGatewayException(err.response.data.errorMessage))
      ));;
  }

  forgetPassword(userId: string, token: string): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${REALM_PRODUCTION}/users/${userId}/reset-password-email`,
        {},
        {
          headers: {
            Content_type: 'application/json',
            Accept: 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(catchError(err =>
        of(ErrorHelper.BadGatewayException(err.response.data.errorMessage))
      ));
  }
}