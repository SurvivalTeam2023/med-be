
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { } from 'Keycloak'
import { map, Observable } from 'rxjs';
import { KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from 'src/environments';


@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  changePassword(id:string): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://localhost:8080/auth/admin/realms/med-app/users/${id}/execute-actions-email`,
        '["UPDATE_PASSWORD"]',
        {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJwVUpMdnZ6a0VXbjRGamY2UXl0Z3dLczVPWkhyWlNZbjc3ODI4QUZlQU5zIn0.eyJleHAiOjE2NjkyNTAzMDMsImlhdCI6MTY2OTIxNDMwMywianRpIjoiMWU5M2JhY2ItOWVjOS00OWJkLWFkOGItNzRkOTgyMzA3YzQ2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiMGE5ODc2MjUtODZlNi00OTIwLWI5YTktMDdhNzUwMmFjNDM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI5ZGRiMDQxNS03MGM2LTQ0NzQtOWVlOC1kNmRmMjM3OTk3MTgiLCJhY3IiOiIxIiwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbWVkLWFwcCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI5ZGRiMDQxNS03MGM2LTQ0NzQtOWVlOC1kNmRmMjM3OTk3MTgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlBo4bqhbSBNaW5oIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaG5pbTE5MjIiLCJnaXZlbl9uYW1lIjoiUGjhuqFtIiwiZmFtaWx5X25hbWUiOiJNaW5oIiwiZW1haWwiOiJobmltMTkyMkBnbWFpbC5jb20ifQ.WqMBRmEf0L_koiwL85o85J3JBlxtOOjjtltTDqPd6M1K2Ahp0PFtl7aQOW55dBj5NErnZyba3eWf6r5dk89TVAuO7ClBfrkKHQZViG8titFLSnblEl-4nDFicJ_3iFf2ilVTBLPVdHlZk4ToiGJ2CaOxFE9citrAuWf5_uVMEOnCfUx3eeWBmfMXPmTyK-JAe2kUNA8dLQLFc5qRqD8hB8Tv_FpuB55OWEpUa3rrXiqcrxRZbeDcq_ZcbjR3Iu-1ycgDXorcoPxWRA_9VZmqXjp3IeEecUdGCs1oe_DLl_8ORO3MPEY0T557TApHQBBTOXI1O9Tc91TmK5vLsYl1IA`,
          },
        },
      )
      .pipe(map((response) => response.data));
  }
}