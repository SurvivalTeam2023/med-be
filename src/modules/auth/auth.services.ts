import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
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
import { UserDTO } from './dto/user.dto';
import { TokenDTO } from './dto/token.dto';
import { ErrorHelper } from 'src/helpers/error.helper';
import { RequiredAction } from 'src/common/enums/user-action.enum';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import Password from 'antd/lib/input/Password';
import { UserService } from '../user/user.services';

@Injectable()
export class AuthService {

  
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => UserService))
    private readonly userService:UserService,

  ) { }

  
  

  async logout(username: string, token: string): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount()
    const response = await firstValueFrom(this.getAcessToken(adminAccount))
    let access_token = `Bearer ${response['access_token']}`
    const user = await this.userService.findUserByName(username, access_token)
    return this.httpService
      .post(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${user[0].id}/logout`, {},
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

  changePassword(): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/28972a06-e764-447f-8cba-7f5ee15ea99d/execute-actions-email`,

        [RequiredAction.UPDATE_PASSWORD],

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkyMzcwMjUsImlhdCI6MTY2OTIwMTAyNSwianRpIjoiZTllNmU1NTItYjkyMi00NTIxLWJlOGItYzE0ZWE5ZGI0Zjk2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI5YmRlZGZlMy0wZmMzLTQwMGMtYWQ2Mi04YjU3YWI2YjUyYjQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjliZGVkZmUzLTBmYzMtNDAwYy1hZDYyLThiNTdhYjZiNTJiNCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.CQaMq1uqTxkPUPWcp1-_-zro8ebHGAHx3kOoO5SZg5lmlrTrfSoqXpGHQ7hAZVtOZC91-R1OGtXggF9SFJZ_WUHrQiPFUi3YU068N052PuIOu7YkhGDHuefoyAPHeK8Hto6NDF8-4JnNqumkBvR8VBvVzjZ96HvmeMa5eTeu27vbYBkzEBpuzG8jcjeBjP2likGdrhqQLblZDpno3NRc-lXFocItS6kQ7gNch7Vdpbi2-hWJKwUNiducWbVZy8dqKO-yl_34rN8v6i0e5OPROH1scgTuhTaHOzYHqH17S6BucTb4Hng_r5HqrG413uT7PLz4Y7Fz-WtRCOb9xLZIyQ`,
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  async verifyEmail(username: string): Promise<Observable<AxiosResponse<[]>>> {
    const adminAccount = this.userService.getAdminAccount()
    const response = await firstValueFrom(this.getAcessToken(adminAccount))
    let token = `Bearer ${response['access_token']}`
    const user = await this.userService.findUserByName(username, token)
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${user[0].id}/execute-actions-email`,

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
