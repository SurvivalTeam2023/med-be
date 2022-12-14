import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom, lastValueFrom, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { KEYCLOAK_ADMIN_ID, KEYCLOAK_ADMIN_PASSWORD, KEYCLOAK_HOST, KEYCLOAK_REALM_ClIENT } from 'src/environments';
import { UserDTO } from './dto/user.dto';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { ErrorHelper } from 'src/helpers/error.helper';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { LoginDTO } from '../auth/dto/login.dto';
import { AuthService } from '../auth/auth.services';
import { RequiredAction } from 'src/common/enums/userAction.enum';
import { USER_REALM_ROLE } from 'src/common/enums/userRealmRole.enum';
import { RoleDTO } from '../auth/dto/role.dto';
import { CreateArtistDTO } from '../artist/dto/createArtist.dto';
import { USER_STATUS } from 'src/common/enums/userStatus.enum';
import { CreateUserDTO } from './dto/createUser.dto';
import UserEntity from './entities/user.entity';
import ArtistEntity from '../artist/entities/artist.entity';
import { LoginGmailDTO } from '../auth/dto/loginGmail.dto';
import { TokenDTO } from '../auth/dto/token.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly entityManage: EntityManager,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
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

  getUserList(token?: string | null): Observable<AxiosResponse<UserDTO[]>> {
    return this.httpService
      .get(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
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

  async assignRole(username: string, roleName: string): Promise<Observable<AxiosResponse<[]>>> {
    const response = await lastValueFrom(this.authService.getAcessToken(this.getAdminAccount()))
    let token = `Bearer ${response['access_token']}`
    const user = await this.findUserByName(username, token)
    const role = await this.findRoleByName(roleName, token)
    return this.httpService.post(`${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${user[0].id}/role-mappings/realm`,
      [{
        "id": `${role['id']}`,
        "name": `${role['name']}`,
        "description": "",
        "composite": false,
        "clientRole": false,
        "containerId": `${role['containerId']}`
      }],
      {
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        },
      }
    ).pipe(map((response) => response.data))
      .pipe(catchError(err => of(ErrorHelper.BadGatewayException(ERROR_MESSAGE.KEYCLOAK.ROLE_ASSIGN))));
  }

  async changeRole(username: string, deleteRole: string, addRole: string): Promise<Observable<AxiosResponse<[]>>> {
    const response = await lastValueFrom(this.authService.getAcessToken(this.getAdminAccount()))
    let token = `Bearer ${response['access_token']}`
    const user = await this.findUserByName(username, token)
    const role = await this.findRoleByName(deleteRole, token)
    lastValueFrom(await this.assignRole(username, addRole))
    return this.httpService.delete(`${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users/${user[0].id}/role-mappings/realm`,
      {
        data: [{
          "id": `${role['id']}`,
          "name": `${role['name']}`,
          "description": "",
          "composite": false,
          "clientRole": false,
          "containerId": `${role['containerId']}`
        }],

        headers: {
          'Accept': 'application/json',
          'Authorization': token
        },
      }
    ).pipe(map((response) => response.data))
      .pipe(catchError(err => of(ErrorHelper.BadGatewayException(ERROR_MESSAGE.KEYCLOAK.ROLE_ASSIGN))));
  }

  async findUserByName(username: string, token?: string | null): Promise<UserEntity> {
    return await lastValueFrom(this.httpService.get(`${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users?username=${username}&exact=true`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': token
      }
    }).pipe(
      map(response => response.data),
    ).pipe(
      catchError(err =>
        of(ErrorHelper.BadGatewayException(ERROR_MESSAGE.KEYCLOAK.USER_NAME)
        ))
    ));
  }

  async findRoleByName(roleName: string, token: string): Promise<RoleDTO> {
    try {
      return await lastValueFrom(this.httpService.get(`${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/roles/${roleName}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': token
        }
      }).pipe(
        map(response => response.data),
      ).pipe(
        catchError(err =>
          of(ErrorHelper.BadRequestException(err)
          ))
      ));
    } catch (error) {
      console.log('error', error)
    }

  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserEntity> {
    if (createUserDTO.dob) {
      this.validateAge(createUserDTO.dob)
    }
    const response = await firstValueFrom(this.authService.getAcessToken(this.getAdminAccount()))
    let token = `Bearer ${response['access_token']}`
    await firstValueFrom(this.httpService
      .post(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
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
          realmRoles:
            [USER_REALM_ROLE.APP_USER],
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

    await lastValueFrom(await this.assignRole(createUserDTO.username, USER_REALM_ROLE.APP_USER))
    const user = await this.findUserByName(createUserDTO.username, token)
    await firstValueFrom(await this.authService.verifyEmail(createUserDTO.username))
    const userInfor = await this.userRepository.save({
      id: user[0].id,
      status: USER_STATUS.ACTIVE,
      ...createUserDTO
    })
    return userInfor
  }



  async createArtist(createArtistDTO: CreateArtistDTO): Promise<ArtistEntity> {
    if (!createArtistDTO.dob) {
      this.validateAge(createArtistDTO.dob)
    }
    const response = await firstValueFrom(this.authService.getAcessToken(this.getAdminAccount()))
    let token = `Bearer ${response['access_token']}`
    await firstValueFrom(this.httpService
      .post(
        `${KEYCLOAK_HOST}/auth/admin/realms/${KEYCLOAK_REALM_ClIENT}/users`,
        {
          createdTimestamp: null,
          username: createArtistDTO.username,
          enabled: true,
          totp: false,
          emailVerified: false,
          firstName: createArtistDTO.firstName,
          lastName: createArtistDTO.lastName,
          email: createArtistDTO.email,
          credentials: [
            {
              type: 'password',
              value: createArtistDTO.password,
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
          realmRoles:
            [USER_REALM_ROLE.APP_USER]
          ,

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
    await firstValueFrom(await this.assignRole(createArtistDTO.username, USER_REALM_ROLE.APP_ARTIST))
    const artist = await this.findUserByName(createArtistDTO.username, token)
    await firstValueFrom(await this.authService.verifyEmail(createArtistDTO.username))
    const artistInfor = await this.artistRepository.save({
      id: artist[0].id,
      status: USER_STATUS.ACTIVE,
      ...createArtistDTO
    })
    return artistInfor
  }

  validateAge = (ageInput: Date): void => {
    const currentDate = moment()
    const age = currentDate.diff(ageInput, "years")
    if (age < 12) {
      ErrorHelper.BadRequestException(ERROR_MESSAGE.USER.UNDER_AGES)
      return null;
    }
  }

  async signInGoogle(loginGmailDTO: LoginGmailDTO): Promise<AxiosResponse<TokenDTO[]>> {
    const access_token = await firstValueFrom(this.authService.getAccessWithGoogle(loginGmailDTO))
    const response = await firstValueFrom(this.authService.getAcessToken(this.getAdminAccount()))
    let token = `Bearer ${response['access_token']}`
    const user = await this.findUserByName(loginGmailDTO.username, token)
    const userId = user[0].id
    const existedUser = await this.entityManage.findOne(UserEntity, { where: { id: userId } })
    if (!existedUser) {
      const newUser: DeepPartial<UserEntity> = { id: userId, firstName: user[0].firstName, username: loginGmailDTO.username }
      await this.entityManage.save(this.entityManage.create(UserEntity, newUser))
    }
    return access_token
  }
}