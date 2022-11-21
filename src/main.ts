import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './common/config/app.config';
import { swaggerConfig } from './common/config/swagger.config';
import { SERVER_PORT } from './environments';

//test CI function 2.0
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await appConfig(app);
  await swaggerConfig(app);
  await app.listen(SERVER_PORT, () => {
    console.log(`Application is running at port: ${SERVER_PORT}`);
  });
}
bootstrap();
