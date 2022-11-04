import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.services';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // @Get('users')
  // findUserById() {
  //   return this.usersService.findUserById();
  // }

  @Post()
  create(@Body()createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}