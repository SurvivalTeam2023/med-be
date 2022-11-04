import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.interface";
import { map } from "rxjs/operators";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly httpService: HttpService) { }

    findAll(): Observable<AxiosResponse<User[]>> {
        return this.httpService.get('http://localhost:8080/auth/admin/realms/med-app/users', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGUzR0S1hLLUpYWjd1TGlzTmVsUHFFOFZSaHNsNnB0UGNPd3ktOGRLX1QwIn0.eyJleHAiOjE2Njc1NjgzNjksImlhdCI6MTY2NzU2ODMwOSwianRpIjoiYWJjNGNmNjktN2JmZi00NjY5LTg3MGItZjliOGQ4ZmExZWFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJhcGktZ3ciLCJtYXN0ZXItcmVhbG0iXSwic3ViIjoiOGIwOGViZmUtNDcwOS00MGVkLTg1MWQtZTc5YTIwYWI3OWNkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjdlMGE0YjI1LTlhYmUtNGNkOS05MjE2LWEyMjNiMDZhOTAyZiIsImFjciI6IjEiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI3ZTBhNGIyNS05YWJlLTRjZDktOTIxNi1hMjIzYjA2YTkwMmYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.WzplgYRkWn463G8JL6A71AWlYqo8uT5hpo5ogj_fbTJuLU0vgPoPNWkDnRrZ2x75yeR4K-tDYibZCtpcytQHcF5PryiT_MOICVwRSr-7kMS8WyQwhnXBuY_5Biw9kq_uVNwDyW0GTIWHJg2_uGkelARJ3Wwd8EvBP0R7j6ecJxyp07xN-eQyM4or1usxsy2-rm8mhxYQTI7LeiRkUIz3ot30f93S8-P0GCy3YfzG74btbA8YDClrnv07nPSRmG-1kcvEwdBB_3Xv_oaL-j51hLZEAWQaVcqp5yyJQsYGGAS0WF5amwmsHz2kIKoPgFbELw0U0apjzI_Tt-9Sq0z9UQ`
            }
        }).pipe(
            map(response => response.data),
        );

    }
    // findUserById(): Observable<AxiosResponse<User>> {
    //     return this.httpService.get('http://localhost:8080/auth/admin/realms/med-app/users/6dda9ebd-d8cf-4845-b6e7-93e12374b161', {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGUzR0S1hLLUpYWjd1TGlzTmVsUHFFOFZSaHNsNnB0UGNPd3ktOGRLX1QwIn0.eyJleHAiOjE2Njc1MzAxOTIsImlhdCI6MTY2NzUzMDEzMiwianRpIjoiMjdlZGJhMzYtZWYwMi00YTY0LWE1YjMtNjhiZjY2NGZiY2JjIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJhcGktZ3ciLCJtYXN0ZXItcmVhbG0iXSwic3ViIjoiOGIwOGViZmUtNDcwOS00MGVkLTg1MWQtZTc5YTIwYWI3OWNkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjUzZjllMDIwLWFlNWQtNDBkOS1hOTZiLTQzM2IwMmUyNTI3ZSIsImFjciI6IjEiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI1M2Y5ZTAyMC1hZTVkLTQwZDktYTk2Yi00MzNiMDJlMjUyN2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.VrCwWqQdWpkcCkt_1izL_SiR9rCNqRThga7bf_haUgGysqfxhTTbE6mUY1hmTsymDnWIFqAzlQlcfteOeWKxOPklVQo89LFTXs_ni4bjYQk3rz8ngYK1AcDM9nTJH2qyhb_pU1EY2UmhqZrwZOjvSbheDOUhU4py3gL-OIBZJ3E3ZKK33kRrtSfCdCZKcf-Wb8NIQckM9h1F9ytbiiIIAOT2WuvupzI5iTPYHvdyglhQXb6DjBasKhK--v8W7xQhcwi4G0Ed1mDc5jv8Kv83D-42b7xkx0XLhTJP-HxQiq1e8aEbRaZgQ3tMjVGFtCwX4mwFR-MkrE3A_VK8PEyBuw`
    //         }
    //     }).pipe(
    //         map(response => response.data),
    //     );

    // }

    create(createUserDto: CreateUserDto): Observable<AxiosResponse<User>> {
        return this.httpService.post('http://localhost:8080/auth/admin/realms/med-app/users',
            {
                createdTimestamp: 1588880747548,
                username: "tamkaisa",
                enabled: true,
                totp: false,
                emailVerified: true,
                firstName: "Nghia",
                lastName: "Nguyen",
                email: "done5@gmail.com",
                disableableCredentialTypes: [],
                requiredActions: [],
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
                    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGUzR0S1hLLUpYWjd1TGlzTmVsUHFFOFZSaHNsNnB0UGNPd3ktOGRLX1QwIn0.eyJleHAiOjE2Njc1NzIxNjMsImlhdCI6MTY2NzU3MjEwMywianRpIjoiZDMwNjY5ZDYtMGNjNC00MmFiLTgyOWYtN2MyNTYwNmVkOWYwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJhcGktZ3ciLCJtYXN0ZXItcmVhbG0iXSwic3ViIjoiOGIwOGViZmUtNDcwOS00MGVkLTg1MWQtZTc5YTIwYWI3OWNkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6ImM0OTgwZDI1LTcyZjMtNGVhMy05NzM0LWE2ZmZkOWE0ZDM3YSIsImFjciI6IjEiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJjNDk4MGQyNS03MmYzLTRlYTMtOTczNC1hNmZmZDlhNGQzN2EiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.NDUg-4qc-Qkz8580k5kQKml1VUEmmEJUqWzZfhdrQbdORcZKflG6gBL0vfRy7enyy4c6eo2ZOJN1fgLJTOmndb4Bs8OMcETWIL4L0kJuqPLOoydwImTxtcSc-AlZdi-DeNEHS1xpy3C2aztqtJqzvPp2FgTvq-urwWmiF6Ab68YuxSAJxzcdgUL_SsOxMSP3B5Ol6Zq8VEnb56E5kLZeWX5NlOu7baZCPoe8Iheg_AgIfL4jYZu_yRega2PRfR0A4SGPnIis4XbZKak6e5FfY-pQnuS_xMzaDY0xzv4NaeRsbbas9amdgGH7P5m7JPnZGb2ggzbeQk102nejMZFLKg`
                },
            }
        ).pipe(
            map(response => response.data),
        );
    }



}