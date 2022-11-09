import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { CreateUserDto } from './dto/create-user.dto';
import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly filesService: FilesService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    fileBuffer: Buffer,
    fileName: string,
  ): Promise<User> {
    const base64Image = await this.addAvatar(fileBuffer, fileName);
    console.log(base64Image);
    const user = {
      ...createUserDto,
      base64Image,
    };
    return this.usersRepository.save(user);
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

  async addAvatar(imageBuffer: Buffer, filename: string) {
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename,
    );
    // const user = await this.findOne(userId);
    // await this.usersRepository.update(userId, {
    //   //   ...user,
    //   avatar,
    // });
    return avatar;
  }
}
