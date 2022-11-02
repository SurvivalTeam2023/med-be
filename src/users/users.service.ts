import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User)
    // private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  // ...

  //   async getById(id: number) {
  //     const user = await this.usersRepository.findOne({ id });
  //     if (user) {
  //       return user;
  //     }
  //     throw new HttpException(
  //       'User with this id does not exist',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }

  async addAvatar(imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    // const user = await this.getById(userId);
    // await this.usersRepository.update(userId, {
    // //   ...user,
    //   avatar,
    // });
    return avatar;
  }
}
