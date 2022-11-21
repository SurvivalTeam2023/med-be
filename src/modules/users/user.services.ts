import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.interface";
import { map } from "rxjs/operators";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Mail } from "./interfaces/mail.interface";
import { Token } from "./interfaces/token.interface";
import { CreateAccessToken } from "./dto/create-access-token.dto";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from "src/environments";

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) { }

    findAll(): Observable<AxiosResponse<User[]>> {
        return this.httpService.get(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjgxMTE4OTgsImlhdCI6MTY2ODA3NTg5OCwianRpIjoiMTAwZWEyNjEtOTE5Yi00NTgwLWFiYjMtYjBmZWZkNWI4OWQyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiMGQ5MmNhMjEtZDFlMi00ZWQ4LWE1ZmUtMDE0ZTU0ZmJhMzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsibWVkLWFwcC5lZHUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWRtaW4tY2xpIjp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImNsaWVudF9yb2xlcy1tZWQtYXBwIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsImNsaWVudElkIjoibWVkLWFwcCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyIsInVtYV9wcm90ZWN0aW9uIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tZWQtYXBwIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEifQ.Hqt63db3YHmiBXUbiiDQDRqEgF2UaxVONnFcbDVR4fnoSlNpUwjUXBrTTOk31UHgyj8odVQ2l04NZbUqpONKmoAhvKwXELu7Ms-A_U0nc-vPig6TcvlI8wVC6Gweiw1MFwPorRMVY-O7UhzcHb4FRjWf-NgY3bE6FFECxTBUd1shmXCuryAnBC9qCEpxwQwbT7-SFff7JGcKsH3mgOHIxoH60lCuof_9gnzNa8XsLAydqUQjx6n-taeSBtJQYUSl-Zb_CqwrAfzuqoU_7s8Rs_IaomZpJ40PdwhVYrMgxeCUE6kzNfVVrF-HrBAEWF4lsWAuBkkcgFIgtk6k75_OFg`
            }
        }).pipe(
            map(response => response),
        );

    }


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
            map(response => response),
        );
    }

    getAcessToken(createAccessToken: CreateAccessToken): Observable<AxiosResponse<Token[]>> {
        const url = `http://${KEYCLOAK_HOST}:8080/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`
        console.log('url', url)
        return this.httpService.post(`http://${KEYCLOAK_HOST}:8080/auth/realms/${KEYCLOAK_REALM_ClIENT}/protocol/openid-connect/token`,
            {
                client_id: `${KEYCLOAK_CLIENT_ID}`,
                grant_type: 'client_credentials',
                client_secret: `${KEYCLOAK_CLIENT_ID}`

            },

            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },

            }
        ).pipe(
            map(response => response),
        );
    }

    verifyEmail(): Observable<AxiosResponse<Mail[]>> {
        return this.httpService
            .put(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/1ca2b3eb-7463-461b-8243-c9da75351660/send-verify-email?client_id=med-app&redirect_uri=http://localhost:8080/auth/realms/med-app/account/`, {},
                {
                    headers: {
                        Content_type: 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2NjgxMTE4OTgsImlhdCI6MTY2ODA3NTg5OCwianRpIjoiMTAwZWEyNjEtOTE5Yi00NTgwLWFiYjMtYjBmZWZkNWI4OWQyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiMGQ5MmNhMjEtZDFlMi00ZWQ4LWE1ZmUtMDE0ZTU0ZmJhMzhjIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsibWVkLWFwcC5lZHUiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1tZWQiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlYWxtLW1hbmFnZW1lbnQiOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwibWVkLWFwcCI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWRtaW4tY2xpIjp7InJvbGVzIjpbInVtYV9wcm90ZWN0aW9uIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImNsaWVudF9yb2xlcy1tZWQtYXBwIHByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTcyLjE4LjAuMSIsImNsaWVudElkIjoibWVkLWFwcCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJyZWFsbS1hZG1pbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyIsInVtYV9wcm90ZWN0aW9uIiwidW1hX3Byb3RlY3Rpb24iLCJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl0sInByZWZlcnJlZF91c2VybmFtZSI6InNlcnZpY2UtYWNjb3VudC1tZWQtYXBwIiwiY2xpZW50QWRkcmVzcyI6IjE3Mi4xOC4wLjEifQ.Hqt63db3YHmiBXUbiiDQDRqEgF2UaxVONnFcbDVR4fnoSlNpUwjUXBrTTOk31UHgyj8odVQ2l04NZbUqpONKmoAhvKwXELu7Ms-A_U0nc-vPig6TcvlI8wVC6Gweiw1MFwPorRMVY-O7UhzcHb4FRjWf-NgY3bE6FFECxTBUd1shmXCuryAnBC9qCEpxwQwbT7-SFff7JGcKsH3mgOHIxoH60lCuof_9gnzNa8XsLAydqUQjx6n-taeSBtJQYUSl-Zb_CqwrAfzuqoU_7s8Rs_IaomZpJ40PdwhVYrMgxeCUE6kzNfVVrF-HrBAEWF4lsWAuBkkcgFIgtk6k75_OFg`,
                    },

                }
            );
    }
}