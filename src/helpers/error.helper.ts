import { HttpException, HttpStatus } from '@nestjs/common';
export class ErrorHelper {
  static BadRequestException(msg: string | string[]) {
    throw new HttpException(msg, HttpStatus.BAD_REQUEST);
  }
  static NotFoundException(msg: string | string[]) {
    throw new HttpException(msg, HttpStatus.NOT_FOUND);
  }
  static UnAuthorizeException(msg: string | string[]) {
    throw new HttpException(msg, HttpStatus.UNAUTHORIZED);
  }
  static BadGatewayException(msg: string | string[]) {
    throw new HttpException(msg, HttpStatus.BAD_GATEWAY);
  }
  static InternalServerException(msg: string | string[]) {
    throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }

}
