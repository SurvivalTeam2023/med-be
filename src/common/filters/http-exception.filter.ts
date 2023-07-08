import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.log('Global_Exception: ', Error);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message, stack } = exception;
    new Logger('HttpExceptionFilter').error({ message, stack });
    new Logger('Raw-Exception').error(exception);
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;
      const error = Array.isArray(exceptionResponse?.message)
        ? exceptionResponse.message.map((msg: string) => ({ message: msg }))
        : [{ message: exceptionResponse }];

      response.status(status).json({
        isSuccess: false,
        code: status,
        message: exception.message,
        error,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        isSuccess: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
        error: [
          {
            fieldName: 'Server',
            message: 'Something went wrong',
          },
        ],
      });
    }
  }
}
