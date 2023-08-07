/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
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
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_URL,
  REALM_PRODUCTION,
} from 'src/environments';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { RequiredAction } from 'src/common/enums/userAction.enum';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { UserService } from '../user/user.services';
import { LoginGmailDTO } from './dto/loginGmail.dto';
import { MESSAGES } from '@nestjs/core/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) { }

  async logout(
    username: string,
    token: string,
  ): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount();
    const response = await firstValueFrom(this.getAcessToken(adminAccount));
    let access_token = `Bearer ${response['access_token']}`;
    const user = await this.userService.findUserByName(username, access_token);
    const userId = user['user_keycloak']['id'];
    return this.httpService
      .post(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${userId}/logout`,
        {},
        {
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(
        catchError((err) =>
          of(
            ErrorHelper.UnAuthorizeException(
              ERROR_MESSAGE.KEYCLOAK.UNAUTHORIZED,
            ),
          ),
        ),
      );
  }

  getAcessToken(loginDTO: LoginDTO): Observable<AxiosResponse<TokenDTO[]>> {
    const form = new URLSearchParams();
    form.append('username', loginDTO.username);
    form.append('password', loginDTO.password);
    form.append('grant_type', 'password');
    form.append('client_id', `${KEYCLOAK_CLIENT_ID}`);
    form.append('client_secret', `${KEYCLOAK_CLIENT_SECRECT}`);
    form.append('scope', 'openid');
    console.log(form);

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
      .pipe(
        map((response) => response.data),
        catchError((err) => {
          console.error(err);
          if (err.response.status == '400')
            return of(
              ErrorHelper.UnAuthorizeException(
                ERROR_MESSAGE.KEYCLOAK.NOT_VERIFY_EMAIL,
              ),
            );
          if (err.response.status == '401')
            return of(
              ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND),
            );
        }),
      );
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
      .pipe(
        map((response) => response.data.refresh_token),
        catchError((err) => {
          if (err.response.status == '400')
            return of(
              ErrorHelper.UnAuthorizeException(
                ERROR_MESSAGE.KEYCLOAK.NOT_VERIFY_EMAIL,
              ),
            );
          if (err.response.status == '401')
            return of(
              ErrorHelper.NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND),
            );
        }),
      );
  }

  getAccessWithGoogle(
    loginGmailDTO: LoginGmailDTO,
  ): Observable<AxiosResponse<TokenDTO[]>> {
    const form = new URLSearchParams();
    form.append(
      'grant_type',
      'urn:ietf:params:oauth:grant-type:token-exchange',
    );
    form.append(
      'subject_token_type',
      'urn:ietf:params:oauth:token-type:access_token',
    );
    form.append('client_id', `${KEYCLOAK_CLIENT_ID}`);
    form.append('client_secret', `${KEYCLOAK_CLIENT_SECRECT}`);
    //YOUR GOOGLE ACCESS TOKEN
    form.append('subject_token', loginGmailDTO.subject_token);
    // YOUR KEYCLOAK IDENTITY PROVIDER NAME
    form.append('subject_issuer', 'google');
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
      .pipe(
        catchError((err) =>
          of(
            ErrorHelper.BadRequestException(ERROR_MESSAGE.USER.SOMETHING_WRONG),
          ),
        ),
      );
  }

  async changePassword(name: string): Promise<Observable<AxiosResponse<[]>>> {
    let adminAccount: LoginDTO = {
      username: KEYCLOAK_ADMIN_ID,
      password: KEYCLOAK_ADMIN_PASSWORD,
    };
    const response = await firstValueFrom(this.getAcessToken(adminAccount));
    let token = `Bearer ${response['access_token']}`;
    const user = await this.userService.findUserByName(name, token);
    const userId = user['user_keycloak']['id'];
    return this.httpService
      .put(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${userId}/execute-actions-email`,
        [RequiredAction.UPDATE_PASSWORD],
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(
        catchError((err) =>
          of(
            ErrorHelper.BadRequestException(ERROR_MESSAGE.USER.SOMETHING_WRONG),
          ),
        ),
      );
  }

  async verifyEmail(username: string): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount();
    const response = await firstValueFrom(this.getAcessToken(adminAccount));
    let token = `Bearer ${response['access_token']}`;
    const user = await this.userService.findUserByName(username, token);

    const userId = user['user_keycloak']['id'];
    return this.httpService
      .put(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${userId}/execute-actions-email`,
        [RequiredAction.VERIFY_EMAIL],
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data))
      .pipe(
        catchError((err) =>
          of(ErrorHelper.BadRequestException(err.response.data.errorMessage)),
        ),
      );
  }

  async forgetPassword(userId: string): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount();
    const response = await firstValueFrom(this.getAcessToken(adminAccount));
    let token = `Bearer ${response['access_token']}`;
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
      .pipe(
        catchError((err) =>
          of(ErrorHelper.BadGatewayException(err.response.data)),
        ),
      );
  }

  getPayPalAccessToken(): Observable<AxiosResponse<[]>> {
    const form = new URLSearchParams();
    form.append('grant_type', 'client_credentials');
    return this.httpService
      .post(`${PAYPAL_URL}/v1/oauth2/token`, form, {
        auth: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_CLIENT_SECRET,
        },
        headers: {
          Content_type: 'application/x-www-form-urlencoded',
        },
      })
      .pipe(map((response) => response.data))
      .pipe(
        catchError((err) =>
          of(ErrorHelper.BadGatewayException(err.response.data)),
        ),
      );
  }
}
