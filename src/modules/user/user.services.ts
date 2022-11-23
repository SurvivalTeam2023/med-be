
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {} from'Keycloak'
import { map, Observable } from 'rxjs';
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRECT, KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from 'src/environments';
import { LoginDTO } from './dto/login.dto';
import { Token } from './interfaces/token.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  changePassword(): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/5a723075-d5ac-4553-903a-5ab0b6688868/execute-actions-email`,
        {
          actions:["UPDATE_PASSWORD"]
        },
        {
          headers: {
            Content_type: 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyRm1hVUo1QUJWd2Vrb09vVlMyWktOa2dvNEVXX2p0NEhhVXU3eUg4QXlRIn0.eyJleHAiOjE2NjkyMTI3NTAsImlhdCI6MTY2OTE5NDc1MCwianRpIjoiNjZlNzA0MjctMGE3NC00NmFjLTljZGEtMjU2MDc2MGZjY2ZiIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiNWE3MjMwNzUtZDVhYy00NTUzLTkwM2EtNWFiMGI2Njg4ODY4IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI0NzEzMTMyOC1mMWU5LTQzNDctYTFlMS1iYTAyNmYwNTBhMWUiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWVkLWFwcCIsIm9mZmxpbmVfYWNjZXNzIiwiYXBwLWFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI0NzEzMTMyOC1mMWU5LTQzNDctYTFlMS1iYTAyNmYwNTBhMWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlBo4bqhbSBNaW5oIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaG5pbTE5MjIiLCJnaXZlbl9uYW1lIjoiUGjhuqFtIiwiZmFtaWx5X25hbWUiOiJNaW5oIiwiZW1haWwiOiJobmltMTkyMkBnbWFpbC5jb20ifQ.C5nJWPIkONlx9ho9eIvyxeyQQpLwSzlpiXk7MaqwHsGlcHVpiN4GET4ggS4hSs3VA-q78QVoECW9LNv37cp2qutAkmAokQRW-mcJ3GRGsWDgsYWG9YnFi7nsNfq1XqOieE16wwInqGABgycbsCeafPsgd3JizbW2-QODGwrQ7CNpgBtMG4RMbsZm1VsaEUd7fteqQVuuapZA5SCpiM5uHfpGCRkccGne8uMbB2C1C0yCDvZpESn-mTdF0zv4FDRy94JMEwxvbgwZKbNXXRniCF23rIa3SZgL1UnZheBak2VD0hYdfDvaUWSgKEkpnP-4gypAhFwbbhOrXOAGUscWQg`,
          },
        },
      )
      .pipe(map((response) => response.data));
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
}