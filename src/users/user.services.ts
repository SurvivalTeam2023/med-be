import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.interface";
import { map } from "rxjs/operators";

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

    findAll(): Observable<AxiosResponse<User[]>> {
        return this.httpService.get('http://localhost:8080/auth/admin/realms/med-app/users', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGUzR0S1hLLUpYWjd1TGlzTmVsUHFFOFZSaHNsNnB0UGNPd3ktOGRLX1QwIn0.eyJleHAiOjE2Njc0MjI1NTksImlhdCI6MTY2NzQyMjQ5OSwianRpIjoiZDQyMTRmOTQtOTM5OS00N2Q5LWFhNjQtMjk5MzAzZTM0MjQyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJhcGktZ3ciLCJtYXN0ZXItcmVhbG0iXSwic3ViIjoiOGIwOGViZmUtNDcwOS00MGVkLTg1MWQtZTc5YTIwYWI3OWNkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjlhMzAyMGI2LWQ5YjUtNGE5Zi04ODcyLTczNTMyZjZhNWZmMSIsImFjciI6IjEiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI5YTMwMjBiNi1kOWI1LTRhOWYtODg3Mi03MzUzMmY2YTVmZjEiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.hZv8z7nFwQ1WEENaSsUvILXnGYKz4ReeKFnGhdPtbp82kisvhQPw_G1rQOYFxulOfkTT-UyjXAxSp4SmibTV730ItNpfyeR1KXrT4_eWVF4Vbb7wNdOn01Qz3xprOwgNdMLF9hvwQ-DXxZ04-8P8NKaDE1KCM5FHZHELzRPK9ebJO-Ay95tTnNpSBFcgI1S1zuMugNcl2lzb8pT1rKTH_MaKvv7dv3RGvs0Ooj9nne3kbac5IDtwP7C2PxW9ZCPAP6h1LORXpTmD1E5X7JAv8cphNYSJoY5eVTzIlzDIxiQ_opvCFb0iKeFxaB4XEPs4S446NbhmlSIqBgumcm5RqQ` 
            }
          }).pipe(
              map(response => response.data),
          );

    }
    
    

}