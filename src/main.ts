import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './common/config/app.config';
import { swaggerConfig } from './common/config/swagger.config';
import { SERVER_PORT } from './environments';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await appConfig(app);
  await swaggerConfig(app);

  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });

  await app.listen(SERVER_PORT, () => {
    console.log(`Application is running at port: ${SERVER_PORT}`);
  });
}
bootstrap();
