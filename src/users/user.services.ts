import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { User } from "./user.interface";

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

    findAll(): Promise<AxiosResponse<User[]>> {
        const headersRequest = {
            'Content-Type': 'application/json', // afaik this one is not needed
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJGUzR0S1hLLUpYWjd1TGlzTmVsUHFFOFZSaHNsNnB0UGNPd3ktOGRLX1QwIn0.eyJleHAiOjE2Njc0MDM5NDksImlhdCI6MTY2NzQwMzg4OSwianRpIjoiNTc3OTI2NGMtN2JmMi00MDAzLThhYzAtY2RiOWNhZDY1YTdkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsImF1ZCI6WyJhcGktZ3ciLCJtYXN0ZXItcmVhbG0iXSwic3ViIjoiOGIwOGViZmUtNDcwOS00MGVkLTg1MWQtZTc5YTIwYWI3OWNkIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYWRtaW4tY2xpIiwic2Vzc2lvbl9zdGF0ZSI6IjhhODI5MmE3LTQ3MmUtNDhkMy04OWRlLTEyZWE1ZTY5MTRlMCIsImFjciI6IjEiLCJyZXNvdXJjZV9hY2Nlc3MiOnsibWFzdGVyLXJlYWxtIjp7InJvbGVzIjpbIm1hbmFnZS11c2VycyIsInZpZXctdXNlcnMiLCJxdWVyeS1ncm91cHMiLCJxdWVyeS11c2VycyJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTgyOTJhNy00NzJlLTQ4ZDMtODlkZS0xMmVhNWU2OTE0ZTAiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIn0.kE329oR9O4vA3PBEo8yIMA51Pk2fanf1UlTWvqJ0nPQ9pl4p1rMurm5xrVWwFJjRSJ6zBXQxjCe653tuz_I2aiHUhfz5gPOYczPOjuoJNR7QKDKib7UQt2Aglv0MFfCY5teUZj76xCYw-oMCpQrHbqCpJzo3bCkqdkgu1pQaZVhoKc4LDaz-Li2JUVzaLbVGzqSoi1bRE6S3120d-olduXmqnuvoYaXq6P2F9RpoCG6hswCwr0LtLKFfeg3O4YugkoRz5Nor4tHb2jwSOqOD7ocwJFoPFzrHeCDut-2NlrPY6tl2hn1SV1fT_HiumIl-S9-74jjTEMwiokjPHH-zxQ`,
        };
    return this.httpService.axiosRef.get('http://localhost:8080/auth/admin/realms/med-app/users', { headers: headersRequest });
  }
}