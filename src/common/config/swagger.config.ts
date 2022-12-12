/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_URL } from 'src/environments';
export const swaggerConfig = async (app: INestApplication) => {
  const option = new DocumentBuilder()
    .setTitle('MED Capstone')
    .setDescription('Meditation healing your soul Demo CICD')
    .setVersion('0.1')
    .addBearerAuth();
  const document = SwaggerModule.createDocument(app, option.build());
  SwaggerModule.setup(SWAGGER_URL, app, document);
};
