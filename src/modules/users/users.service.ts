import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from 'aws-sdk';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { KEYCLOAK_HOST, REALM_PRODUCTION } from 'src/environments';
import { Repository } from 'typeorm';
import { FileDTO } from '../files/dto/file.dto';
import { FilesService } from '../files/files.service';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(FileDTO)
    private readonly filesService: FilesService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const file_result = await this.filesService.getFile(
      createUserDto.avarta.id,
      createUserDto.avarta.key,
    );
    const user = { ...createUserDto };
    user.avarta = file_result.file;
    return this.usersRepository.create(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
  //   const avatar = await this.filesService.uploadPublicFile(
  //     imageBuffer,
  //     filename,
  //   );
  //   const user = await this.findOne(userId);
  //   await this.usersRepository.update(userId, {
  //     //   ...user,
  //     avatar,
  //   });
  //   return avatar;
  // }

  forgetPassword(): Observable<AxiosResponse<[]>> {
    return this.httpService
      .put(
        `http://${KEYCLOAK_HOST}:8080/auth/admin/realms/${REALM_PRODUCTION}/users/4f75554e-8e7d-4bde-8ffb-02ee98a5cb64/reset-password-email`,
        {},
        {
          headers: {
            Content_type: 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyRm1hVUo1QUJWd2Vrb09vVlMyWktOa2dvNEVXX2p0NEhhVXU3eUg4QXlRIn0.eyJleHAiOjE2NjkyMzQzODMsImlhdCI6MTY2OTIxNjM4MywianRpIjoiM2ViYmJhMzEtZDVhYi00ZDY1LTk4OGMtY2E0NzExMzMwNjZhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21lZC1hcHAiLCJhdWQiOlsicmVhbG0tbWFuYWdlbWVudCIsImFjY291bnQiXSwic3ViIjoiZDkwN2FlYTktNTNkYi00ZTA3LWJiYTEtNDNkYWUzY2JiNTQ2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWVkLWFwcCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tZWQtYXBwIiwiVXNlciIsIm9mZmxpbmVfYWNjZXNzIiwiYXBwLWFkbWluIiwidW1hX2F1dGhvcml6YXRpb24iLCJBZG1pbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJjbGllbnRIb3N0IjoiMTcyLjE5LjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiY2xpZW50SWQiOiJtZWQtYXBwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW1lZC1hcHAiLCJjbGllbnRBZGRyZXNzIjoiMTcyLjE5LjAuMSJ9.kmIeT7NelVGLDZfrbJajbwS2Mgnd46Yr2RzD2cwo7FaMZILYE9T4Y5TgAODXV6k2dzvVzioCAScdpmY1R32gH3Qutw5e-Gmgt5aeWUst59z22OpHOxKnfBpLKSiHWdeKPB9MDJ27my2GPP6Un4z7W2KCbaYbsoSzvDcSesKp0us-CF0Wmj84ilv9ngtfuomx3BLSLjPCm9wKDXYmJJ0M7EZ2Os_UNFNdQU8WshmxnxOHx49TPZWcmJMP-Ark_UWrqfwinAKxtFnb1miNJg7ISNeJA4VXktY0eCJISTtoQFB1eEo5mDl_jXEmlbUlwB86VT1l_ly9OCHBDthkJRBMpg`,
          },
        },
      )
      .pipe(map((response) => response.data));
  }
}
