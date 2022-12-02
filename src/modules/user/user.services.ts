import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
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
import { RequiredAction } from 'src/common/enums/user-action.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) { }


  getAdminAccount = () => {
    let adminAccount: LoginDTO = {
      username: KEYCLOAK_ADMIN_ID,
      password: KEYCLOAK_ADMIN_PASSWORD
    }
    return adminAccount
  }

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
      .pipe(map((response) => response.data))
      .pipe(catchError(err => of(ErrorHelper.BadGatewayException(err.response.data.errorMessage))));

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
    const response = await firstValueFrom(this.authService.getAcessToken(this.getAdminAccount()))
    let token = `Bearer ${response['access_token']}`
    await firstValueFrom(this.httpService
      .post(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
        {
          createdTimestamp: null,
          username: createUserDTO.username,
          enabled: true,
          totp: false,
          emailVerified: false,
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
          requiredActions: [RequiredAction.VERIFY_EMAIL]
          ,
          notBefore: 0,
          access: {
            manageGroupMembership: true,
            view: true,
            mapRoles: true,
            impersonate: true,
            manage: true,
          },
          realmRoles: ['app-user'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token,
          },
        },
      )
      .pipe(map((response) => response.data))
    ).catch(err => {
      ErrorHelper.BadRequestException(err.response.data.errorMessage)
    })
    const user = await this.findUserByName(createUserDTO.username, token)
    await firstValueFrom(await this.authService.verifyEmail(createUserDTO.username))
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
