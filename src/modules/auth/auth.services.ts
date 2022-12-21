import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  KEYCLOAK_ADMIN_ID,
  KEYCLOAK_ADMIN_PASSWORD,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRECT,
  KEYCLOAK_HOST,
  KEYCLOAK_REALM_ClIENT,
  REALM_PRODUCTION,
} from 'src/environments';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { RequiredAction } from 'src/common/enums/user-action.enum';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { UserService } from '../user/user.services';
import { LoginServerDTO } from './dto/loginServer';
import { LoginGmailDTO } from './dto/loginGmail.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) { }

  async logout(username: string, token: string): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount()
    const response = await firstValueFrom(this.getAcessToken(adminAccount))
    let access_token = `Bearer ${response['access_token']}`
    const user = await this.userService.findUserByName(username, access_token)
    return this.httpService
      .post(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${user[0].id}/logout`, {},
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
        `${KEYCLOAK_HOST}/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
        form,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(catchError(err =>
        of(ErrorHelper.BadRequestException(err))
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
        `${KEYCLOAK_HOST}/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
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
  getAccessWithGoogle(loginGmailDTO: LoginGmailDTO): Observable<AxiosResponse<TokenDTO[]>> {
    const form = new URLSearchParams();
    form.append('grant_type', "urn:ietf:params:oauth:grant-type:token-exchange");
    form.append('subject_token_type', "urn:ietf:params:oauth:token-type:access_token");
    form.append('client_id', `${KEYCLOAK_CLIENT_ID}`);
    form.append('client_secret', `${KEYCLOAK_CLIENT_SECRECT}`);
    //YOUR GOOGLE ACCESS TOKEN
    form.append('subject_token', loginGmailDTO.subject_token);
    // YOUR KEYCLOAK IDENTITY PROVIDER NAME
    form.append('subject_issuer', "google");
    return this.httpService
      .post(
        `${KEYCLOAK_HOST}/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
        form,
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(catchError(err =>
        of(ErrorHelper.BadRequestException(err))
      ));

  }
  async changePassword(name: string): Promise<Observable<AxiosResponse<[]>>> {
    let adminAccount: LoginDTO = {
      username: KEYCLOAK_ADMIN_ID,
      password: KEYCLOAK_ADMIN_PASSWORD
    }
    const response =  await firstValueFrom(this.getAcessToken(adminAccount))
    let token = `Bearer ${response['access_token']}`
    const user =  await this.userService.findUserByName(name, token)
    const userId= user[0].id
    return this.httpService
      .put(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${userId}/execute-actions-email`,
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


  async verifyEmail(username: string): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount()
    const response = await firstValueFrom(this.getAcessToken(adminAccount))
    let token = `Bearer ${response['access_token']}`
    const user = await this.userService.findUserByName(username, token)
    return this.httpService
      .put(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${user[0].id}/execute-actions-email`,
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
      ));
  }

  forgetPassword(userId: string, token: string): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `${KEYCLOAK_HOST}/auth/admin/realms/${REALM_PRODUCTION}/users/${userId}/reset-password-email`,
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