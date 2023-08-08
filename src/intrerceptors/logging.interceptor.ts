import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('Request Url:', request.url);
    console.log('Request Body:', request.body);
    return next.handle().pipe(
      tap(() => {
        console.log('Response Body:', request.body);
      }),
    );
  }
}
