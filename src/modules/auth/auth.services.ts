import { HttpException, Injectable } from '@nestjs/common';
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
import { MailDTO } from './dto/mail.dto';
import { ErrorHelper } from 'src/helpers/error.helper';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) { }

  logout(): Observable<AxiosResponse<UserDTO[]>> {
    return this.httpService
      .get(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/6dda9ebd-d8cf-4845-b6e7-93e12374b161/logout`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkxNjA2MzYsImlhdCI6MTY2OTEyNDYzNiwianRpIjoiNzViZWY2OTMtYTAzMi00ZjBiLTkzOTgtMDRmODE4NWE5Y2VlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiIwMDViZDY5OS0wZTFiLTRhYTUtYTY1Mi05MTQwMGQ2MzM1MzAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjAwNWJkNjk5LTBlMWItNGFhNS1hNjUyLTkxNDAwZDYzMzUzMCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.SobpckY2ekygHJgQY6y2REAE6tqTX4FTmMGyPgfokG3G_X3BJpEU1EZt78hg2riTwIQOoUzQtpPyLZ3JP7SIEAOQUT1Gv4vtSbQ8uvI9U0LzdTY6-Xr1N8pTC5KrZkEQbMkQFG8q9Ee4-5OYekSJ9zTrCO3koZW4huLQPQVGVWI4vZEShtlgR5iyt9jdwPuBlXd4L5J-N6zvtOGzvsbJzJw-Dl0jbCiJ-vpV-Q50uoCMTsa5p9Zg5aFfwz_o6eCjkWLVYCC7UPHpEjJ7S9Lgrlzr4b0RLtloSB58MpV91wVxIIfq1Ba1UMcVrUYRvuMC5bCri5Jc_jzBYPG-W9ZXHA`,
          },
        },
      )
      .pipe(map((response) => response.data));
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
        of(ErrorHelper.BadGatewayException(err.response.data.errorMessage))
      ));
  }
  verifyEmail(): Observable<AxiosResponse<MailDTO[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/4e4698c3-4a42-4356-907e-ae795ad5186e/send-verify-email?client_id=med-app&redirect_uri=http://localhost:8080/auth/realms/med-app/account/`,
        {},
        {
          headers: {
            Content_type: 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkxNDM2MDksImlhdCI6MTY2OTEwNzYwOSwianRpIjoiMmM1MjQ5YTUtZTRjZC00NGNjLTllMWUtN2RjN2NkOGJkNjM5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiJlMjRkYThlNy04MjUzLTQyYmEtODNkMC04MmNlYjEzMzVmMzkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1zdWJzY3JpYmVyIiwiYXBwLWFkbWluIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJzdWJzY3JpYmVyIiwiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImUyNGRhOGU3LTgyNTMtNDJiYS04M2QwLTgyY2ViMTMzNWYzOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwic3Vic2NyaWJlciIsImFkbWluIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sIm5hbWUiOiJ0YW0gbm90IHdpYnUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0YW0iLCJnaXZlbl9uYW1lIjoidGFtIiwiZmFtaWx5X25hbWUiOiJub3Qgd2lidSIsImVtYWlsIjoidGFtcGhhbTAzMTEyQGdtYWlsLmNvbSJ9.GdQ_404AEuplvu0-6OhLiSc0IdN_so-NiwIjLhuTIb-5PtzkUzGo48vwLH3E-EjHvXZ4YBzZM6v0vAlQKWzfo4Ioz0-cttUeYx5S9Z8-DrwRntK_CzMQZz_tfeheDtm_wR1Px7Hr7jr81UHoRWO7qEFz3oaSUk0Q-Eho1f1vzJX9hTIjHFflK00aIpQwBNCQfxVI81lSmlhnf6Qo39Ff5llj5qc_G-rvhvpNIwsvpIJeCgtcZYwePV4vdEWI4xFWfhofEQGerf-UTEcLyVIQ-pTKRYuw8HZu8apPHjRnR3P3NzTUYkFM6QiNrX24le9HpyobRYYgTX1cwDx26_pPrQ`,
          },
        },
      )
      .pipe(map((response) => response.data));
  }
  changePassword(id: string, token?: string | null): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${id}/execute-actions-email`,
        ['UPDATE_PASSWORD'],
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
  forgetPassword(id: string, token?: string | null): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${REALM_PRODUCTION}/users/${id}/reset-password-email`,
        {},
        {
          headers: {
            Content_type: 'application/json',
            Accept: 'application/json',
            Authorization: token
          },
        },
      )
      .pipe(map((response) => response.data));
  }
}
