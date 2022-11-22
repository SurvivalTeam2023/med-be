import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.entity";
import { map } from "rxjs/operators";
import { CreateUserDTO } from "./dto/createUser.dto";
import { Mail } from "./interfaces/mail.entity";
import { Token } from "./interfaces/token.entity";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRECT, KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from "src/environments";
import { LoginDTO } from "./dto/login.dto";

@Injectable()

export class UsersService {

    constructor(private readonly httpService: HttpService) { }

    findAll(): Observable<AxiosResponse<User[]>> {
        return this.httpService.get(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkxNzE3MTMsImlhdCI6MTY2OTEzNTcxMywianRpIjoiZTA3MmE5YmMtNTAyYy00MTMzLTkyYjgtNTM3ZWNjZGVmOTAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI1NTZjNGVjOC04MWRlLTQwMDItYWUxOC0wMjI3ZDUzMzZmYTciLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjU1NmM0ZWM4LTgxZGUtNDAwMi1hZTE4LTAyMjdkNTMzNmZhNyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.HQKomADnKKTGejOA4-ds21LO2Fyatlz-UMIFoMgtfTFjl-GSGuqeVP-KYvhbp5FE45rV9SaBkKh3vGaEUo6nEXiloEYmZP-kUXUSNl_ljLzFY_fbOoqQtQm-jjVbWifxQedSKuybdYFhDjHfV7zPZXJ25itnhB_Oa7tHf3mj6yB3u-HMhD1O3fmrUg1MaLlHTLm9uZk3c5CHTWIdH2buK6Rlc3TzzQlFo_gmBmG5IkG-EiP1yI2WJELVmt5atbZuzLU6Q9nRqLL2nDX-w7XaNQEgA5gML_6G8TnPghwpC6jIn8omOK3BbJ3GQSdelo1kaIUmAI59mJCh6Y_Sv0i6PQ`
            }

        }).pipe(
            map(response => response.data),
        );
    }

    logout(): Observable<AxiosResponse<User[]>> {
        return this.httpService.get(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/6dda9ebd-d8cf-4845-b6e7-93e12374b161/logout`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkxNjA2MzYsImlhdCI6MTY2OTEyNDYzNiwianRpIjoiNzViZWY2OTMtYTAzMi00ZjBiLTkzOTgtMDRmODE4NWE5Y2VlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiIwMDViZDY5OS0wZTFiLTRhYTUtYTY1Mi05MTQwMGQ2MzM1MzAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjAwNWJkNjk5LTBlMWItNGFhNS1hNjUyLTkxNDAwZDYzMzUzMCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.SobpckY2ekygHJgQY6y2REAE6tqTX4FTmMGyPgfokG3G_X3BJpEU1EZt78hg2riTwIQOoUzQtpPyLZ3JP7SIEAOQUT1Gv4vtSbQ8uvI9U0LzdTY6-Xr1N8pTC5KrZkEQbMkQFG8q9Ee4-5OYekSJ9zTrCO3koZW4huLQPQVGVWI4vZEShtlgR5iyt9jdwPuBlXd4L5J-N6zvtOGzvsbJzJw-Dl0jbCiJ-vpV-Q50uoCMTsa5p9Zg5aFfwz_o6eCjkWLVYCC7UPHpEjJ7S9Lgrlzr4b0RLtloSB58MpV91wVxIIfq1Ba1UMcVrUYRvuMC5bCri5Jc_jzBYPG-W9ZXHA`
            }

        }).pipe(
            map(response => response.data),
        );
    }

    // findUserById(): Observable<AxiosResponse<User[]>> {
    //     return this.httpService.get(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/6dda9ebd-d8cf-4845-b6e7-93e12374b161`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkxNDM2MDksImlhdCI6MTY2OTEwNzYwOSwianRpIjoiMmM1MjQ5YTUtZTRjZC00NGNjLTllMWUtN2RjN2NkOGJkNjM5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiJlMjRkYThlNy04MjUzLTQyYmEtODNkMC04MmNlYjEzMzVmMzkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1zdWJzY3JpYmVyIiwiYXBwLWFkbWluIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJzdWJzY3JpYmVyIiwiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImUyNGRhOGU3LTgyNTMtNDJiYS04M2QwLTgyY2ViMTMzNWYzOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwic3Vic2NyaWJlciIsImFkbWluIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sIm5hbWUiOiJ0YW0gbm90IHdpYnUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0YW0iLCJnaXZlbl9uYW1lIjoidGFtIiwiZmFtaWx5X25hbWUiOiJub3Qgd2lidSIsImVtYWlsIjoidGFtcGhhbTAzMTEyQGdtYWlsLmNvbSJ9.GdQ_404AEuplvu0-6OhLiSc0IdN_so-NiwIjLhuTIb-5PtzkUzGo48vwLH3E-EjHvXZ4YBzZM6v0vAlQKWzfo4Ioz0-cttUeYx5S9Z8-DrwRntK_CzMQZz_tfeheDtm_wR1Px7Hr7jr81UHoRWO7qEFz3oaSUk0Q-Eho1f1vzJX9hTIjHFflK00aIpQwBNCQfxVI81lSmlhnf6Qo39Ff5llj5qc_G-rvhvpNIwsvpIJeCgtcZYwePV4vdEWI4xFWfhofEQGerf-UTEcLyVIQ-pTKRYuw8HZu8apPHjRnR3P3NzTUYkFM6QiNrX24le9HpyobRYYgTX1cwDx26_pPrQ`
    //         }

    //     }).pipe(
    //         map(response => response.data),
    //     );
    // }


    create(createUserDTO: CreateUserDTO): Observable<AxiosResponse<User>> {
        return this.httpService.post(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
            {
                createdTimestamp: 1588880747548,
                username: createUserDTO.username,
                enabled: true,
                totp: false,
                emailVerified: true,
                firstName: createUserDTO.firstName,
                lastName: createUserDTO.lastName,
                email: createUserDTO.email,
                credentials: [
                    {
                        type: 'password',
                        value: createUserDTO.password,
                        temporary: false
                    }
                ],
                requiredActions: [
                ],
                notBefore: 0,
                access: {
                    manageGroupMembership: true,
                    view: true,
                    mapRoles: true,
                    impersonate: true,
                    manage: true
                },
                realmRoles: [
                    "user"
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjgxMTE4OTgsImlhdCI6MTY2ODA3NTg5OCwianRpIjoiMTAwZWEyNjEtOTE5Yi00NTgwLWFiYjMtYjBmZWZkNWI4OWQyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiMGQ5MmNhMjEtZDFlMi00ZWQ4LWE1ZmUtMDE0ZTU0ZmJhMzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsibWVkLWFwcC5lZHUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWRtaW4tY2xpIjp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImNsaWVudF9yb2xlcy1tZWQtYXBwIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsImNsaWVudElkIjoibWVkLWFwcCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyIsInVtYV9wcm90ZWN0aW9uIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tZWQtYXBwIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEifQ.Hqt63db3YHmiBXUbiiDQDRqEgF2UaxVONnFcbDVR4fnoSlNpUwjUXBrTTOk31UHgyj8odVQ2l04NZbUqpONKmoAhvKwXELu7Ms-A_U0nc-vPig6TcvlI8wVC6Gweiw1MFwPorRMVY-O7UhzcHb4FRjWf-NgY3bE6FFECxTBUd1shmXCuryAnBC9qCEpxwQwbT7-SFff7JGcKsH3mgOHIxoH60lCuof_9gnzNa8XsLAydqUQjx6n-taeSBtJQYUSl-Zb_CqwrAfzuqoU_7s8Rs_IaomZpJ40PdwhVYrMgxeCUE6kzNfVVrF-HrBAEWF4lsWAuBkkcgFIgtk6k75_OFg`
                },
            }
        ).pipe(
            map(response => response.data),
        );
    }

    getAcessToken(loginDTO: LoginDTO): Observable<AxiosResponse<Token[]>> {
        const form = new URLSearchParams()
        form.append('username', loginDTO.username)
        form.append('password', loginDTO.password)
        form.append('grant_type', 'password')
        form.append('client_id', `${KEYCLOAK_CLIENT_ID}`)
        form.append('client_secret', `${KEYCLOAK_CLIENT_SECRECT}`)
        form.append('scope', 'openid')
        return this.httpService.post(`http://${KEYCLOAK_HOST}:8080/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
            form,
            {
                headers: {
                    "Content-type": 'application/x-www-form-urlencoded'
                },
            }
        ).pipe(
            map(response => response.data.access_token),
        );
    }




    verifyEmail(): Observable<AxiosResponse<Mail[]>> {
        return this.httpService
            .put(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/4e4698c3-4a42-4356-907e-ae795ad5186e/send-verify-email?client_id=med-app&redirect_uri=http://localhost:8080/auth/realms/med-app/account/`, {},
                {
                    headers: {
                        Content_type: 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjkxNDM2MDksImlhdCI6MTY2OTEwNzYwOSwianRpIjoiMmM1MjQ5YTUtZTRjZC00NGNjLTllMWUtN2RjN2NkOGJkNjM5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiJlMjRkYThlNy04MjUzLTQyYmEtODNkMC04MmNlYjEzMzVmMzkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1zdWJzY3JpYmVyIiwiYXBwLWFkbWluIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJzdWJzY3JpYmVyIiwiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImUyNGRhOGU3LTgyNTMtNDJiYS04M2QwLTgyY2ViMTMzNWYzOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwic3Vic2NyaWJlciIsImFkbWluIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sIm5hbWUiOiJ0YW0gbm90IHdpYnUiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0YW0iLCJnaXZlbl9uYW1lIjoidGFtIiwiZmFtaWx5X25hbWUiOiJub3Qgd2lidSIsImVtYWlsIjoidGFtcGhhbTAzMTEyQGdtYWlsLmNvbSJ9.GdQ_404AEuplvu0-6OhLiSc0IdN_so-NiwIjLhuTIb-5PtzkUzGo48vwLH3E-EjHvXZ4YBzZM6v0vAlQKWzfo4Ioz0-cttUeYx5S9Z8-DrwRntK_CzMQZz_tfeheDtm_wR1Px7Hr7jr81UHoRWO7qEFz3oaSUk0Q-Eho1f1vzJX9hTIjHFflK00aIpQwBNCQfxVI81lSmlhnf6Qo39Ff5llj5qc_G-rvhvpNIwsvpIJeCgtcZYwePV4vdEWI4xFWfhofEQGerf-UTEcLyVIQ-pTKRYuw8HZu8apPHjRnR3P3NzTUYkFM6QiNrX24le9HpyobRYYgTX1cwDx26_pPrQ`
                    },
                }
            ).pipe(
                map(response => response.data),
            );
    }


}