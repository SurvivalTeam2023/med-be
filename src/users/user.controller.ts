import { Controller, Get, Header } from '@nestjs/common';
import { UsersService } from './user.services';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
  @Get()
  
  findAll() {
   
      return this.usersService.findAll();
  }
}