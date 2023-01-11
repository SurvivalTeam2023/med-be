/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './common/config/app.config';
import { awsConfig } from './common/config/aws.config';
import { swaggerConfig } from './common/config/swagger.config';
import { SERVER_PORT } from './environments';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await appConfig(app);
  await swaggerConfig(app);
  await awsConfig();
  await app.listen(SERVER_PORT, () => {
    console.log(`Application is running at port: ${SERVER_PORT}`);
  });
}
bootstrap();
