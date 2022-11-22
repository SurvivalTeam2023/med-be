// import { Injectable } from '@nestjs/common';
// import { UserDTO } from '../users/dto/user.dto';
// import { UsersService } from '../users/user.services';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService) {}

//   async validateUser(userDTO: UserDTO): Promise<any> {
//     const user = await this.usersService.findUserById(userDTO);
//     if (user && userDTO.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }
// }