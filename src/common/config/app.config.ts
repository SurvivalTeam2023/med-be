import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_BASE_URL_PREFIX } from 'src/environments';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
export const appConfig = async (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(APP_BASE_URL_PREFIX);
};
