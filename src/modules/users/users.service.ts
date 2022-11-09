import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import PublicFile from '../files/publicFile.entity';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(PublicFile)
    private readonly filesService: FilesService,
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
}
