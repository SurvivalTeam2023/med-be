import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.interface";
import { map } from "rxjs/operators";
import { CreateUserDto } from "./dto/create-user.dto";
import { Mail } from "./interfaces/mail.interface";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) { }

    findAll(): Observable<AxiosResponse<User[]>> {
        return this.httpService.get(`http://${this.configService.get("KEYCLOAK_HOST")}:8080/auth/admin/realms/${this.configService.get("KEYCLOAK_REALM_CLIENT")}/users`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGUzR0S1hLLUpYWjd1TGlzTmVsUHFFOFZSaHNsNnB0UGNPd3ktOGRLX1QwIn0.eyJleHAiOjE2Njc1NjgzNjksImlhdCI6MTY2NzU2ODMwOSwianRpIjoiYWJjNGNmNjktN2JmZi00NjY5LTg3MGItZjliOGQ4ZmExZWFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJhcGktZ3ciLCJtYXN0ZXItcmVhbG0iXSwic3ViIjoiOGIwOGViZmUtNDcwOS00MGVkLTg1MWQtZTc5YTIwYWI3OWNkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjdlMGE0YjI1LTlhYmUtNGNkOS05MjE2LWEyMjNiMDZhOTAyZiIsImFjciI6IjEiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI3ZTBhNGIyNS05YWJlLTRjZDktOTIxNi1hMjIzYjA2YTkwMmYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.WzplgYRkWn463G8JL6A71AWlYqo8uT5hpo5ogj_fbTJuLU0vgPoPNWkDnRrZ2x75yeR4K-tDYibZCtpcytQHcF5PryiT_MOICVwRSr-7kMS8WyQwhnXBuY_5Biw9kq_uVNwDyW0GTIWHJg2_uGkelARJ3Wwd8EvBP0R7j6ecJxyp07xN-eQyM4or1usxsy2-rm8mhxYQTI7LeiRkUIz3ot30f93S8-P0GCy3YfzG74btbA8YDClrnv07nPSRmG-1kcvEwdBB_3Xv_oaL-j51hLZEAWQaVcqp5yyJQsYGGAS0WF5amwmsHz2kIKoPgFbELw0U0apjzI_Tt-9Sq0z9UQ`
            }
        }).pipe(
            map(response => response.data),
        );

    }


    create(createUserDto: CreateUserDto): Observable<AxiosResponse<User>> {
        return this.httpService.post(`http://${this.configService.get("KEYCLOAK_HOST")}:8080/auth/admin/realms/${this.configService.get("KEYCLOAK_REALM_CLIENT")}med-app/users`,
            {
                createdTimestamp: 1588880747548,
                username: createUserDto.username,
                enabled: true,
                totp: false,
                emailVerified: true,
                firstName: createUserDto.firstname,
                lastName: createUserDto.lastname,
                email: createUserDto.email,
                credentials: [
                    {
                        type: 'password',
                        value: createUserDto.password,
                        temporary: false
                    }
                ],
                requiredActions: [
                    {}
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
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2Njc4NzAwNTMsImlhdCI6MTY2NzgzNDA1MywianRpIjoiNWNlZTZmNGItYzJhZC00ZDk0LWFjYjYtM2M3ZmMwZmVmZDM2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiMGQ5MmNhMjEtZDFlMi00ZWQ4LWE1ZmUtMDE0ZTU0ZmJhMzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLW1lZCIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhZG1pbi1jbGkiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsImNsaWVudEhvc3QiOiIxNzIuMTguMC4xIiwiY2xpZW50SWQiOiJtZWQtYXBwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tZWQtYXBwIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEifQ.fIj2Bnk7NA7KXIG6abGU_3Xix_0tNjqjBKPxnP9ZRBtfIv-6Gb_WXnrCg6g3y-HQ1tWRzVRdfCzkmO3uUkH03z_8eISWY0utYJ2Bxw_vKeu7-Z2caNxxWMil51f3PcTEdt6g46FskDGLlgI-5xHRALNelfAt6TkTxP7ycVRCauEYeSQmd5KAVxda8DBD3-icsLJZrg9bh2DN96kmHpK8Idce1w0vyRG9-x5djKtdSrJweiU0NVyoVu0WoHjeFohnMuNpOs1vpbr5Zs8LgC4EflNjRbEdTKeHsZaadB7L-zBoa1nEnAOCZ4n2NYlLn-I5DTvMUXK2UgWbT3erDYYBXg`
                },
            }
        ).pipe(
            map(response => response.data),
        );
    }

    getAcessToken(): Observable<AxiosResponse<User>> {
        return this.httpService.post(`http://${"KEYCLOAK_HOST"}}:8080/auth/realms/${"KEYCLOAK_REALM_CLIENT"}/protocol/openid-connect/token`,
            {
                client_id: `${this.configService.get("KEYCLOAK_CLIENT_ID")}`,
                grant_type: 'client_credentials',
                client_secret: `${this.configService.get("KEYCLOAK_CLIENT_SECRECT")}`
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2Njc4NzAwNTMsImlhdCI6MTY2NzgzNDA1MywianRpIjoiNWNlZTZmNGItYzJhZC00ZDk0LWFjYjYtM2M3ZmMwZmVmZDM2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiMGQ5MmNhMjEtZDFlMi00ZWQ4LWE1ZmUtMDE0ZTU0ZmJhMzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLW1lZCIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhZG1pbi1jbGkiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsImNsaWVudEhvc3QiOiIxNzIuMTguMC4xIiwiY2xpZW50SWQiOiJtZWQtYXBwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tZWQtYXBwIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEifQ.fIj2Bnk7NA7KXIG6abGU_3Xix_0tNjqjBKPxnP9ZRBtfIv-6Gb_WXnrCg6g3y-HQ1tWRzVRdfCzkmO3uUkH03z_8eISWY0utYJ2Bxw_vKeu7-Z2caNxxWMil51f3PcTEdt6g46FskDGLlgI-5xHRALNelfAt6TkTxP7ycVRCauEYeSQmd5KAVxda8DBD3-icsLJZrg9bh2DN96kmHpK8Idce1w0vyRG9-x5djKtdSrJweiU0NVyoVu0WoHjeFohnMuNpOs1vpbr5Zs8LgC4EflNjRbEdTKeHsZaadB7L-zBoa1nEnAOCZ4n2NYlLn-I5DTvMUXK2UgWbT3erDYYBXg`
                },
            }
        ).pipe(
            map(response => response.data),
        );
    }

    verifyEmail(): Observable<AxiosResponse<Mail[]>> {
        return this.httpService
            .put(`http://${this.configService.get("KEYCLOAK_HOST")}:8080/auth/admin/realms/${this.configService.get("KEYCLOAK_REALM_CLIENT")}/users/1ca2b3eb-7463-461b-8243-c9da75351660/send-verify-email?client_id=med-app&redirect_uri=http://localhost:8080/auth/realms/med-app/account/`, {},
                {
                    headers: {
                        Content_type: 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2Njc5NTMxMjYsImlhdCI6MTY2NzkxNzEyNiwianRpIjoiY2M0M2E2NTYtYzdjZC00MWM2LTk0ZjktYzdlYTdjNmUzYzFkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiMGQ5MmNhMjEtZDFlMi00ZWQ4LWE1ZmUtMDE0ZTU0ZmJhMzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsibWVkLWFwcC5lZHUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWRtaW4tY2xpIjp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImNsaWVudF9yb2xlcy1tZWQtYXBwIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsImNsaWVudElkIjoibWVkLWFwcCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyIsInVtYV9wcm90ZWN0aW9uIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tZWQtYXBwIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEifQ.Tv2FdHb5zCZ0g3nzL1NpTmNOwdTU_bGEia3DGw_Q3GKYo__LipR-fjlmj15OYzB54_7DlY8Pqg7cexFuFtaxQqUOCWIVjGxXLDmgsC9xmWetiSREdOqcgjlfyOkQORQXTiM2DtHVxLD5RPzLQ6c2Be1tTGcoIbNoQVYLdn4KlqP5-AncG_bcdfaKYH_l3VvUh7TY-ZtsDJSklomSApM094rMwin9qkbe1QAix64rPCbuCToP2FwLGJ-KD5wkhP3n_pjMt326eiiybGHCwW6FVJEcRDHnnXwfkBognq7Hc73UWEMll04kdUe9qBEteKWzHjueQy-DBuBBvI4zYNi3rA`,
                    },
                },
            )
            .pipe(map((response) => response.data));
    }


}