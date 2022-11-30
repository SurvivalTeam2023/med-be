import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CreateUserDTO } from './dto/createUser.dto';
import { KEYCLOAK_ADMIN_ID, KEYCLOAK_ADMIN_PASSWORD, KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from 'src/environments';
import { UserDTO } from './dto/user.dto';
import * as moment from 'moment';
import User from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { LoginDTO } from '../auth/dto/login.dto';
import { AuthService } from '../auth/auth.services';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly authService: AuthService
  ) { }


  findAll(token?: string | null): Observable<AxiosResponse<UserDTO[]>> {
    return this.httpService
      .get(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data));

  }

  findUserByName(username: string, token?: string | null): Promise<User> {
    return lastValueFrom(this.httpService.get(`http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users?username=${username}&exact=true`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': token
      }

    }).pipe(
      map(response => response.data),
    ).pipe(
      catchError(err =>
        of(ErrorHelper.BadGatewayException(err.response.data.errorMessage)
        ))
    ));
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    this.validateAge(createUserDTO.dob)
    let adminAccount: LoginDTO = {
      username: KEYCLOAK_ADMIN_ID,
      password: KEYCLOAK_ADMIN_PASSWORD
    }
    const response = await firstValueFrom(this.authService.getAcessToken(adminAccount))
    let token = `Bearer ${response['access_token']}`
    await firstValueFrom(this.httpService
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
            Authorization: `${token}`,
          },
        },
      )
      .pipe(map((response) => response.data))
    ).catch(err => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage)
    })
    const user = await this.findUserByName(createUserDTO.username, token)
    const userInfor = await this.userRepository.save({
      id: user[0].id,
      username: createUserDTO.username,
      firstName: createUserDTO.firstName,
      lastName: createUserDTO.lastName,
      dob: createUserDTO.dob,
    })
    return userInfor
  }

  validateAge = (ageInput: Date): void => {
    const currentDate = moment()
    const age = currentDate.diff(ageInput, "years")
    if (age < 12) {
      ErrorHelper.BadRequestException(ERROR_MESSAGE.USER.UNDER_AGES)
      return null;
    }
  }
}
