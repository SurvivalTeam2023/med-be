import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDTO } from './dto/createUser.dto';
import { KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from 'src/environments';
import { UserDTO } from './dto/user.dto';
import * as moment from 'moment';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService, @InjectRepository(User) private userRepository: Repository<User>) { }


  findAll(): Observable<AxiosResponse<UserDTO[]>> {

    return this.httpService
      .get(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2Njk3MzA2MzgsImlhdCI6MTY2OTY5NDYzOCwianRpIjoiZmExYTlmZTMtNzBhMy00MTM5LTgwM2YtNTZiZDhhYTMxMzZlIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI3NjQ0NmMzZC0xMGU0LTQ1NjMtOGZmNS1mMWEwYmFjMWJjZGIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6Ijc2NDQ2YzNkLTEwZTQtNDU2My04ZmY1LWYxYTBiYWMxYmNkYiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.DWnqguzaIxRwSPkCzXLWJ8xBtF3Zrr9KC1An4UjHgIfw_P97OMjld50rlOzZeP2USThUiliLCk1WyV_A5qoQaPInbqR4Y2PYS-DnxqgUmc5WIAu2IvV-AKOAsVP2Iqdv1Ux7MlWkoXP1M0OW9bhqZC-Ij9an5EwQe2gHzNO5fdDpSdV309GdM85g1vX47vHVWFLGq2V2-Awtj6OvRKx4xbAPiTY5Ppwy__kSVvTaScZJo5FthKdyzRcSv215OZw3VnBKA_fRUsvTSpPccsmQStbcTjbg-2Mdx5KAdsvUqhKp7GoUqW7MJ_zwuah4RaHKKdus2dP3T6qt_-qJF7Wv7Q`,
          },
        },
      )
      .pipe(map((response) => response.data));

  }

  findUserByName(username: string): Promise<User> {
    return lastValueFrom(this.httpService.get(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users?username=${username}&exact=true`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2Njk3MzcwMzYsImlhdCI6MTY2OTcwMTAzNiwianRpIjoiMmVjNDRiZmQtMTAxNi00MWM3LTgzNTAtYzBjMDNlYWU2NGYyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI0ZjFiMjZlYS05NjM2LTRjZmItYjY2Yi03YTQzMjExMDFmMWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjRmMWIyNmVhLTk2MzYtNGNmYi1iNjZiLTdhNDMyMTEwMWYxZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.grQRm8fEhcrm_k3sTb6_2j1u1Cq_Uyb3iBVeVmw6bXTPIMpNVDD49LdDvKWe-ItEiu2ucQtelYopBnkh_LrLF-o8pN1GZ4bkhyE5cSfq60J6V7Q7iL2NydwCMAnt-kVFwsKIyFtWISJMsQktSG6mR5_9JODqg9UzsnkAKLqCXRUb2Yy80T8_FgZNsuoECmx05W5nahae43NFKFd6B0MUOBIpAR1bs71zN75YTuK4CwleHidMZsNaSLYq1LAzvgE1HWcnictJE1UMR37mKyBup-c7R3ZU2Iat86RNWYC3r4wsKU6A-ApLmTythEQxmfU00bVJY-rFFH6jPGm4zsd1ew`
      }

    }).pipe(
      map(response => response.data),
    ));
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const currentDate = moment()
    const age = currentDate.diff(createUserDTO.dob, "years")
    if (age < 12) {
      console.log('not du tuoi')
      return null;
    }
    const userCreated = await firstValueFrom(this.httpService
      .post(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
        {
          createdTimestamp: null,
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
              temporary: false,
            },
          ],
          requiredActions: [],
          notBefore: 0,
          access: {
            manageGroupMembership: true,
            view: true,
            mapRoles: true,
            impersonate: true,
            manage: true,
          },
          realmRoles: ['user'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzU3JaNndtZWxUMzlYdV8wWnBjOFpia2hfZHRLMzF0WFlBdnhTNDJWTDU0In0.eyJleHAiOjE2Njk3MzcwMzYsImlhdCI6MTY2OTcwMTAzNiwianRpIjoiMmVjNDRiZmQtMTAxNi00MWM3LTgzNTAtYzBjMDNlYWU2NGYyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFkbWluLWNsaSIsImFjY291bnQiXSwic3ViIjoiNmRkYTllYmQtZDhjZi00ODQ1LWI2ZTctOTNlMTIzNzRiMTYxIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsInNlc3Npb25fc3RhdGUiOiI0ZjFiMjZlYS05NjM2LTRjZmItYjY2Yi03YTQzMjExMDFmMWUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIm1lZC1hcHAuZWR1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImFwcC1hZG1pbiIsImRlZmF1bHQtcm9sZXMtbWVkIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJyZWFsbS1tYW5hZ2VtZW50Ijp7InJvbGVzIjpbInZpZXctcmVhbG0iLCJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwicmVhbG0tYWRtaW4iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1lZC1hcHAiOnsicm9sZXMiOlsiYWRtaW4iXX0sImFkbWluLWNsaSI6eyJyb2xlcyI6WyJ1bWFfcHJvdGVjdGlvbiJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgY2xpZW50X3JvbGVzLW1lZC1hcHAgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjRmMWIyNmVhLTk2MzYtNGNmYi1iNjZiLTdhNDMyMTEwMWYxZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIiwiYWRtaW4iLCJ1bWFfcHJvdGVjdGlvbiIsIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXSwibmFtZSI6InRhbSBub3Qgd2lidSIsInByZWZlcnJlZF91c2VybmFtZSI6InRhbSIsImdpdmVuX25hbWUiOiJ0YW0iLCJmYW1pbHlfbmFtZSI6Im5vdCB3aWJ1IiwiZW1haWwiOiJ0YW1waGFtMDMxMTJAZ21haWwuY29tIn0.grQRm8fEhcrm_k3sTb6_2j1u1Cq_Uyb3iBVeVmw6bXTPIMpNVDD49LdDvKWe-ItEiu2ucQtelYopBnkh_LrLF-o8pN1GZ4bkhyE5cSfq60J6V7Q7iL2NydwCMAnt-kVFwsKIyFtWISJMsQktSG6mR5_9JODqg9UzsnkAKLqCXRUb2Yy80T8_FgZNsuoECmx05W5nahae43NFKFd6B0MUOBIpAR1bs71zN75YTuK4CwleHidMZsNaSLYq1LAzvgE1HWcnictJE1UMR37mKyBup-c7R3ZU2Iat86RNWYC3r4wsKU6A-ApLmTythEQxmfU00bVJY-rFFH6jPGm4zsd1ew`,
          },
        },
      )
      .pipe(map((response) => response.data)));
    const user = await this.findUserByName(createUserDTO.username)
    console.log('user', user[0].id)
      const entity = this.userRepository.save({
        id: user[0].id,
        username: createUserDTO.username,
        firstName: createUserDTO.firstName,
        lastName: createUserDTO.lastName,
        dob: createUserDTO.dob,
      })
  
      return userCreated.data;
    
    
  }


}
