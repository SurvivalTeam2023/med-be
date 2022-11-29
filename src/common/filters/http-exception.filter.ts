import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { AppHelper } from 'src/helpers/app.helper';
@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const { message, stack } = exception as {
      message: unknown;
      stack: unknown;
    };
    new Logger('HttpExceptionFilter').error({ message, stack });
    new Logger('Raw-Exception').error(exception)
    if (exception instanceof HttpException) {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionResponse = exception.getResponse() as any;
      const error = AppHelper.checkArrString(exceptionResponse?.message)
        ? AppHelper.messageErrPasser(exceptionResponse.message)
        : [exceptionResponse];
      return response.status(status).json({
        isSuccuss: false,
        code: response.statusCode,
        message: exception.message,
        error,
      });
    }
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).join({
      isSuccuss: false,
      code: response.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong',
      errors: [
        {
          fieldName: 'Server',
          message: 'Something went wrong',
        },
      ],
    });
  }
}
